const path = require('path')
const router = require('express').Router()

exports.routes = () => {
  // path to the routes/ directory
  const normalizedPaths = path.join(__dirname)

  require('fs')
    .readdirSync(normalizedPaths)
    .forEach((filename) => {
      if (filename === 'index.js') return

      filename = filename.replace('.js', '')
      const routeFile = require(path.join(__dirname, '../routes', filename))
      for (const [_, route] of Object.entries(routeFile)) {
        console.log(route)
        // value itself is the route
        const middleware = route.middleware || []
        router[route.method](`${route.path}`, middleware, route.handler)
      }
    })

  return router
}
