const validateData = (data, schema) => {
  for (const field in schema) {
    const fieldDef = schema[field]
    const value = data[field]

    if (fieldDef.required && !value) {
      throw new Error(`${field} alanının girilmesi zorunludur.`)
    }

    if (value && typeof value !== fieldDef.type && fieldDef.type !== 'any') {
      throw new Error(`${field} alan tipi ${fieldDef.type} olmak zorunda.`)
    }
  }
}

module.exports = { validateData }
