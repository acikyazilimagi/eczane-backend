module.exports = {
  postLocation: {
    request: {
      type: 'post',
      route: '/',
    },
    header: {
      required: ['authorization'],
    },
    body: {
      required: [''],
      optional: [''],
    },
  },
}
