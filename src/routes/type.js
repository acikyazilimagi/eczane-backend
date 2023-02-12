const { auth } = require('../middleware/auth')
const CONTROLLER = require('../controllers/type')

module.exports = {
  getAllTypes: {
    method: 'get',
    path: '/types',
    middleware: [],
    handler: (req, res, next) => CONTROLLER.getAllTypes(req, res, next),
  },

  postType: {
    method: 'post',
    path: '/types',
    middleware: [auth],
    handler: (req, res, next) => CONTROLLER.postType(req, res, next),
  },

  updateType: {
    method: 'put',
    path: '/type/:id',
    middleware: [auth],
    handler: (req, res, next) => CONTROLLER.updateType(req, res, next),
  },

  deleteType: {
    method: 'delete',
    path: '/type/:id',
    middleware: [auth],
    handler: (req, res, next) => CONTROLLER.deleteType(req, res, next),
  },
}
