const { Router } = require('express')
const path = require('path')
const fs = require('fs')

exports.getRoutes = () => {
  const router = Router()
  const normalizedPaths = path.join(__dirname)

  fs.readdirSync(normalizedPaths).forEach((filename) => {
    filename = filename.replace('.js', '')
    const routeFile = require(path.join(__dirname, '../routes', filename))
    for (const [_, route] of Object.entries(routeFile)) {
      const middleware = route.middleware || []
      router[route.method](`${route.path}`, middleware)
    }
  })
  return router
}
