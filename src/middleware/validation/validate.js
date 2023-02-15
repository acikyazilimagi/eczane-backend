const { validateData } = require('../../utilities/validation')

exports.validateRequest = (req, schema, next) => {
  const { body, params, query } = req

  if (body) {
    validateData(body, schema.body)
  }
  if (params) {
    validateData(params, schema.params)
  }
  if (query) {
    validateData(query, schema.query)
  }

  next()
}
