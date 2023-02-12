const { auth } = require('../middleware/auth')
const CONTROLLER = require('../controllers/subtype')

module.exports = {
  getAllSubtypes: {
    method: 'get',
    path: '/subtypes',
    middleware: [],
    handler: (req, res, next) => CONTROLLER.getAllSubtypes(req, res, next),
  },

  postSubtype: {
    method: 'post',
    path: '/subtype',
    middleware: [auth],
    handler: (req, res, next) => CONTROLLER.postSubtype(req, res, next),
  },

  updateSubtype: {
    method: 'put',
    path: '/subtype/:id',
    middleware: [auth],
    handler: (req, res, next) => CONTROLLER.updateSubtype(req, res, next),
  },

  deleteSubtype: {
    method: 'delete',
    path: '/subtype/:id',
    middleware: [auth],
    handler: (req, res, next) => CONTROLLER.deleteSubtype(req, res, next),
  },
}
