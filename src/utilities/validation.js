const validateData = (data, schema) => {
    for (const field in schema) {
        const schemaObject = schema[field]
        const value = data[field]

        if (value) {
            validateType(value, schemaObject.type, field)
        } else if (schemaObject.required) {
            throw new Error(`${field} alanının girilmesi zorunludur.`)
        }
    }

}

const validateType = (value, type, field) => {
    if (type === 'any') {
        return
    } else if (typeof value !== type) {
        throw new Error(`${field} alanının ${type} olması gerekiyor.`)
    }
}

exports.validateData = validateData