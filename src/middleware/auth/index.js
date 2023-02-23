exports.auth = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') return next()
  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    throw new Error('Unauthorized')
  }

  next()
}
