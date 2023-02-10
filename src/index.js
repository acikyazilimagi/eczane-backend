require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors')
app.use(express.json())

const { router } = require('./routes')

app.use('/api', router)
app.use(cors())

app.listen(process.env.PORT, () => console.log('App started'))
