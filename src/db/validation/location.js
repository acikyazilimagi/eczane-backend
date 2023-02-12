const schema = {
    name: {
      type: 'string',
      required: true
    },
    phone: {
      type: 'any',
    },
    address: {
      type: 'string',
      required: true
    },
    additionalAddressDetails: {
      type: 'string'
    },
    workingHours: {
      type: 'string',
      required: true
    },
    latitude: {
      type: 'number',
      required: true
    },
    longitude: {
      type: 'number',
      required: true
    },
    cityId: {
      type: 'number',
      required: true
    },
    districtId: {
      type: 'number',
      required: true
    },
    typeId: {
      type: 'number',
      required: true
    },
    code: {
      type: 'string',
      required: true
    },
    subTypeId: {
      type: 'number',
      required: true
    }
  };
  
  exports.validateData = (data) => {
    for (const field in schema) {
      const fieldDef = schema[field];
      const value = data[field];
  
      if (fieldDef.required && !value) {
        throw new Error(`${field} alanının girilmesi zorunludur.`);
      }
  
      if (value && typeof value !== fieldDef.type) {
        throw new Error(`${field} alan tipi ${fieldDef.type} olmak zorunda.`);
      }
    }
  };
  
