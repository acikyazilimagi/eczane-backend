const { auth } = require('../middleware/auth')
const CONTROLLER = require('../controllers/location')
const VALIDATION = require('../middleware/validation/schemas/location')
const { validateRequest } = require('../middleware/validation/validate')

module.exports = {
  getAllLocations: {
    method: 'get',
    path: '/locations',
    middleware: [(req, res, next) => validateRequest(req, VALIDATION.getAllLocations, next)],
    handler: (req, res, next) => CONTROLLER.getAllLocations(req, res, next),
  },

  postLocation: {
    method: 'post',
    path: '/location',
    middleware: [auth],
    handler: (req, res, next) => CONTROLLER.postLocation(req, res, next),
  },

  updateLocation: {
    method: 'put',
    path: '/location/:id',
    middleware: [auth],
    handler: (req, res, next) => CONTROLLER.updateLocation(req, res, next),
  },

  deleteLocation: {
    method: 'delete',
    path: '/location/:id',
    middleware: [auth],
    handler: (req, res, next) => CONTROLLER.deleteLocation(req, res, next),
  },
}
