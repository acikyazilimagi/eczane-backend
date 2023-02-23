require('dotenv').config()

let config = null

if (process.env.NODE_ENV === 'production') {
  config = require('./prod')
} else if (process.env.NODE_ENV === 'development') {
  config = require('./dev')
} else if (process.env.NODE_ENV === 'test') {
  config = require('./test')
}

exports.config = config
