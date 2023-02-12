const schema = {
    name: {
      type: 'string',
      required: true
    },
    phone: {
      type: 'any'
    },
    address: {
      type: 'string',
      required: true
    },
    additionalAddressDetails: {
      type: 'string'
    },
    workingHours: {
      type: 'string'
    },
    latitude: {
      type: 'any',
      required: true
    },
    longitude: {
      type: 'any',
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
      type: 'string'
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
  
      if (value && (typeof value !== fieldDef.type && fieldDef.type !== 'any')) {
        throw new Error(`${field} alan tipi ${fieldDef.type} olmak zorunda.`);
      }
    }
  };
  
