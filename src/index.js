const app = require('./app')
const { config } = require('./config')

const port = config.app.port
app.listen(port)
