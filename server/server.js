const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const cors = require('cors')
require('dotenv').config()
app.use(cors())

mongoose.connect('mongodb://localhost/hacktiv-overflow')
app.set('port', process.env.PORT || 3000)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(logger('dev'))

app.use('/', index)

app.listen(app.get('port'), () => {
  console.log('Listen on port: '+app.get('port'));
})