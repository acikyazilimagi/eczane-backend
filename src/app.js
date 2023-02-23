const express = require('express')
const cors = require('cors')
require('express-async-errors')
const { errorHandler } = require('./middleware/error')
const { response } = require('./middleware/response')

class App {
  express
  #routes

  constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.express.use(express.json())
    this.express.use(cors())
  }

  routes() {
    const { routes } = require('./routes/index.js')
    this.express.use('/api', routes(), response)
    this.express.use(errorHandler)
  }

  listen(port) {
    this.port = port
    this.express.listen(this.port, () => console.log(`App started on port: ${this.port}`))
  }
}

const app = new App()

module.exports = app
