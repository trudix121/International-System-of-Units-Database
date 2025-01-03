const express = require('express');
const router = express.Router();

const { pool } = require('../db/postdb');
const { db, insert, find } = require('../db/mongodb');
router.use(express.urlencoded({ extended: true }))
router.use(express.json())
const cookiejwt= require('../lib/jwt')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
require('dotenv').config({ path: '../.env' })

router.use(cookieParser())

router.get('/', async (req, res) => {
    try {
        const jwt1 = jwt.verify(req.cookies.token, process.env.JWT)
        if (jwt1.role == 'admin') {
           return res.redirect('admin/dashboard')
        }
        else {
            return res.render('admin/login')
        }


        
    }
    catch (err) {
        console.log('Error: ', err)
        res.render('admin/login')
    }


  //  res.render('admin/login')
})

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Interogare baza de date
        const result = await pool.query(
            'SELECT * FROM admin WHERE username = $1 AND password = $2',
            [username, password]
        );

        if (result.rows.length <= 0) {
            return res.status(401).send('Invalid username or password');
        }

        // Generare token JWT
        const jwts = jwt.sign(
            { role: 'admin' }, // Datele din payload
            process.env.JWT, // Secretul
            { expiresIn: '1h' } // Opțiuni token
        );

        // Setare token în cookie
        res.cookie('token', jwts, {
            httpOnly: true, // Previne accesul JavaScript la cookie
            maxAge: 3600000 // 1 oră
        });

        // Redirecționare la dashboard
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).send('Internal Server Error');
    }
});



router.get('/dashboard', cookiejwt, (req, res) => {
    res.render('admin/dashboard')
})
router.post('/dashboard', cookiejwt, async (req, res) => {
    const { unit_type, unit_name, conversion_formulas, conversion_names, conversion_symbols, ...rest } = req.body;

    // Check if unit exists
    const result = await find('base_units', 'derived_units', {
        unit_type: unit_name.toLowerCase()
    });

    if (result.finded) {
        return res.send('Units Already Exist');
    }

    // Handle conversions data
    const conversions = {};
    if (conversion_names && conversion_symbols && conversion_formulas) {
        conversion_names.forEach((name, index) => {
            conversions[name] = {
                symbol: conversion_symbols[index],
                formula: conversion_formulas[index]
            };
        });
    }

    // Base unit insertion data
    const baseUnitData = {
        unit_type: unit_name.toLowerCase(),
        base_unit: rest.base_unit,
        symbol: rest.symbol,
        measures: rest.measures,
        measuring_instruments: rest.measuring_instruments,
        conversions
    };

    // Add base_formula if it exists
    if (rest.formulas) {
        baseUnitData.base_formula = rest.formulas.toString();
    }

    // Derived unit insertion data
    const derivedUnitData = {
        unit_type: unit_name.toLowerCase(),
        unit: rest.base_unit,
        symbol: rest.symbol,
        measures: rest.measures,
        measuring_instruments: rest.measuring_instruments,
        base_formula: rest.base_formula,
        conversions
    };

    // Insert based on unit type
    if (unit_type === 'base') {
        await insert('base_units', baseUnitData);
    } else if (unit_type === 'derived') {
        await insert('derived_units', derivedUnitData);
    }

    res.redirect(`/data/${unit_name.toLowerCase()}`);
});

router.get('/requests', cookiejwt, async (req, res) => {
    try {
        // Fetch all requests from the 'requests' collection
        const requests = await db.collection('requests').find({}).toArray();

        // Render the 'admin/requests' view with the requests data
        res.render('admin/requests', { users: requests });
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/accept/:id', cookiejwt, async (req, res) => {
    const id = req.params.id;

    try {
        // Convert the string id to an ObjectId using 'new'
        const objectId = new ObjectId(id);
        console.log(objectId)

        // Access the requests collection
        const rest = db.collection('requests');

        // Update the document with the specified _id
        const result = await rest.findOneAndUpdate(
            { '_id': objectId },
            { $set: { 'accepted': true } },
            { returnOriginal: false } // Optionally return the updated document
        );
        if (result != null) {
            res.redirect('/admin/requests')
        }
        else if (result == null) {
            res.send('Some Error, Request was not found')
        }
    } catch (error) {
        console.error("Error accepting request:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get('/reject/:id', cookiejwt, async (req, res) => {
    const id = req.params.id;

    try {
        // Convert the string id to an ObjectId using 'new'
        const objectId = new ObjectId(id);
        console.log(objectId)

        // Access the requests collection
        const rest = db.collection('requests');

        // Update the document with the specified _id
        const result = await rest.findOneAndUpdate(
            { '_id': objectId },
            { $set: { 'rejected': true } },
            { returnOriginal: false } // Optionally return the updated document
        );
        if (result != null) {
            res.redirect('/admin/requests')
        }
        else if (result == null) {
            res.send('Some Error, Request was not found')
        }
    } catch (error) {
        console.error("Error rejecting request:", error);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/view/:id', cookiejwt, async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id)
        const user = await db.collection('requests').findOne({ _id })
        res.render('admin/view', {user: user})
    }
    catch (error) {
        console.log('Error: ',error)
    }
    
})

router.get('/delete/:id', cookiejwt, async (req, res) => {
    const id = req.params.id;
    const objectId = new ObjectId(id)
    try {
        db.collection('requests').deleteOne({'_id': objectId})
        res.redirect('/admin/requests')
    }
    catch (error) {
        console.log('Error: ', error)
        res.send('Error: ', error)
    }
})

router.get('/add/:id', cookiejwt, async (req, res) => {
    const id = req.params.id
    //console.log(id)
    try {
        const request = await db.collection('requests').findOne({ _id: new ObjectId(id) })
       // console.log(request)
        console.log(request.suggest)
        if (request != null) {
            const conversions = {};
            if (request.suggest.conversion_names != null && request.suggest.conversion_symbols != null && request.suggest.conversion_formulas != null) {
                conversion_names.forEach((name, index) => {
                    conversions[name] = {
                        symbol: conversion_symbols[index],
                        formula: conversion_formulas[index]
                    };
                });
            }
            const main_req = await find('base_units', 'derived_units', {
                unit_type: request.suggest.unit_name.toLowerCase()
            })
            //console.log(main_req)
            if (main_req.finded === true) {
                res.send('Unit already Exist with that name')
            }
            else if (main_req.finded == false) {
               // console.log(request.suggest.unit_type)
                if (request.suggest.unit_type == 'base') {
                    let base_formula;
   
                    await insert('base_units', {
                        unit_type: request.suggest.unit_name.toLowerCase(),
                        base_unit: request.suggest.base_unit,
                        base_formula: request.suggest.base_formula,
                        symbol: request.suggest.symbol,
                        measures: request.suggest.measures,
                        measuring_instruments: request.suggest.measuring_instruments,
                        conversions: conversions
                    }).then(() => {
                    
                        const fullUrl = `http://${req.headers.host}/admin/accept/${id}`;
                        fetch(fullUrl, {
                            headers: {
                                'Cookie': `token=${req.cookies.token}`
                            }
                        })
                    })

                }
                else if (request.suggest.unit_type == 'derived')
                {
                    
                    await insert('derived_units', {
                        unit_type: request.suggest.unit_name.toLowerCase(),
                        unit: request.suggest.unit,
                        symbol: request.suggest.symbol,
                        measures: request.suggest.measures,
                        measuring_instruments: request.suggest.measuring_instruments,
                        base_formula: request.suggest.base_formula,
                        conversions: conversions
                    }).then(() => {

                        const fullUrl = `http://${req.headers.host}/admin/accept/${id}`;
                        fetch(fullUrl, {
                            headers: {
                                'Cookie': `token=${req.cookies.token}`
                            }
                        })
                    })


                    }
            }
            
        }
        else {
            return res.send('Invalid Id')
        }

    }
    catch (error) {
        console.log('Error: ', error)
        return res.send('Error')
    }
})

module.exports = router
