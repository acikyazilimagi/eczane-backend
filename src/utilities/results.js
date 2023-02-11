import { response as res } from 'express'

const response = (message, success, data) => {
  return { message, success, data }
}

res.ok = () => {
  return this.status(200).json(response('Success', true, data))
}

res.unauthorized = () => {
  return this.status(401).json(response('Unauthorized', false, null))
}

res.badRequest = () => {
  return this.status(400).json(response('Bad Request', false, null))
}

res.error = () => {
  return this.status(500).json(response('Internal Server Error', false, null))
}
