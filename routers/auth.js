const express = require('express')
const router = express.Router()
const jwtverify = require('../lib/jwt')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { createNewUser, pool  } = require('../db/postdb')
const bcrypt = require('bcrypt')

router.use(cors())
router.use(cookieParser())



router.use(express.urlencoded({extended:true}))
router.use(express.json())

router.get('/login', (req, res) => {
    console.log(req.cookies)
    try {
        const verify = jwt.verify(req.cookies.token, process.env.JWT)
        if (verify) {
            res.redirect('/users')
        }
    }
    catch (error) {
        res.render('auth/login')
    }

})

router.post('/login',async (req, res) => {
    const { credentials, password } = req.body
//    console.log(req.body)
    const result = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $1;', [credentials])
    if (result.rows.length > 0) {
        const r = await bcrypt.compareSync(password, result.rows[0].password)
        if (r == false) {
            res.send('Wrong Credentials')
        }
        else if (r == true) {
            if (req.body.remember !== undefined || req.body.remember == 'on' || req.body.remember == undefined ) {
                const token = jwt.sign({ username: result.rows[0].username, role: result.rows[0].role }, process.env.JWT, { expiresIn: 3600000 })
                res.cookie('token', token, {
                    httpOnly: true, // Previne accesul JavaScript la cookie
                    maxAge: 3600000 // 1 oră
                });
                res.redirect('/users')
            }
        }
    }

})



router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', (req, res) => {
    const { username, email, password } = req.body
 
    
    
    createNewUser(email, password, 'user', username).then((e) => {
        if (e.success == false) {
            res.send(e.reason)
        }
        else {
            res.redirect('/auth/login')
        }
    })
})

router.get('/logout', jwtverify, (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = router