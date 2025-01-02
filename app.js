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


app.use('/', index)



app.listen(process.env.PORT, ()=>{
    console.log('SUCCESS')
})
