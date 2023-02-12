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

const validateData = (data, schema) => {
  for (const field in schema) {
    const required = schema[field].required || false
    const exists = !!data[field]

    // if required but not exists
    if (required && !exists) {
      throw new Error(`${field} alanının girilmesi zorunludur.`)
    }

    // validate type
    if (exists) {
      const type = schema[field].type
      const value = data[field]

      if (type === 'string') {
        if (typeof value !== 'string') {
          throw new Error(`${field} alanının string olması gerekiyor.`)
        }
      } else if (type === 'number') {
        if (typeof value !== 'number') {
          throw new Error(`${field} alanının number olması gerekiyor.`)
        }
      } else if (type === 'any') {
        // do nothing
      } else {
        throw new Error(`Bilinmeyen tip: ${type}`)
      }
    }
  }
}
