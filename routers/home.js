const express = require('express')
const router = express.Router()
const jwtverify = require('../lib/jwt')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { pool } = require('../db/postdb')
const { insert, db, find_data } = require('../db/mongodb')

router.use(express.urlencoded({extended:true}))
router.use(express.json())
router.use(cors())
router.use(cookieParser())
router.use(jwtverify)


router.get('/dashboard', async (req, res) => {
    const user = await pool.query('SELECT * FROM users WHERE username = $1;', [req.user.username])
    res.render('home/home', {data: user.rows[0]})
})

router.post('/suggest', async (req, res) => {
    //console.log(req.body)
    const {unit_type, unit_name, base_unit, formulas, unit, symbol, measures, measuring_instruments, conversion_names, conversion_symbols, conversion_formulas} = req.body
    console.log(req.body)
    let formula;
    if (req.body.base_formula == null) {
        formula = formulas[0]
    }
    else if (req.body.formulas == null) {
        formula = req.body.base_formula
    }
    await insert('requests', {
        'username': req.user.username,
        'suggest':{
            'unit_type': unit_type,
            'unit_name': unit_name,
            'base_unit': base_unit,
            'base_formula': formula,
            'unit': unit,
            'symbol': symbol,
            'measures': measures,
            'measuring_instruments': measuring_instruments,
            'conversion_names': conversion_names,
            'conversion_symbols': conversion_symbols,
            'conversion_formulas': conversion_formulas
        }
    })
    res.send('Your Request was submitted successfully <a href="/users/dashboard">Return to Home</a>')
})




module.exports = router