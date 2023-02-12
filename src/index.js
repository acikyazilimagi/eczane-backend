const { App } = require('./app')

const app = new App()
app.listen(process.env.PORT, () => console.log('App started'))
