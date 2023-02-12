module.exports = {
  getAllLocations: {},

  postLocation: {
    body: {
      name: {
        type: 'string',
        required: true,
      },
      phone: {
        type: 'any',
      },
      address: {
        type: 'string',
        required: true,
      },
      additionalAddressDetails: {
        type: 'string',
      },
      workingHours: {
        type: 'string',
        required: true,
      },
      latitude: {
        type: 'number',
        required: true,
      },
      longitude: {
        type: 'number',
        required: true,
      },
      cityId: {
        type: 'number',
        required: true,
      },
      districtId: {
        type: 'number',
        required: true,
      },
      typeId: {
        type: 'number',
        required: true,
      },
      code: {
        type: 'string',
        required: true,
      },
      subTypeId: {
        type: 'number',
        required: true,
      },
    },
  },
}
