const express = require('express')
const app = express()
const cors = require('cors')
const ejs = require('ejs')
require('dotenv').config()

app.use(cors())

app.set(express.urlencoded({extended:true}))
app.set(express.json())

app.set('view engine', 'ejs')
app.set('views', './views')

// routers
const index = require('./routers/index')
const admin = require('./routers/admin')
const auth = require('./routers/auth')
const home = require('./routers/home')
const api  = require('./routers/api')


app.use('/', index)
app.use('/admin', admin)
app.use('/auth', auth)
app.use('/users', home)
app.use('/api', api)

app.listen(process.env.PORT, ()=>{
    console.log(`Server Running on http://localhost:${process.env.PORT}`)
})
