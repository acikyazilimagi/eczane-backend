let express = require('express')

const response = (message, success, data) => {
  return { message, success, data }
}

express.response.ok = () => {
  return this.status(200).json(response('Success', true, data))
}

express.response.unauthorized = (res) => {
  return res.status(401).json(response('Unauthorized', false, null))
}

express.response.badRequest = (res) => {
  return res.status(400).json(response('Bad Request', false, null))
}

express.response.error = (res) => {
  return res.status(500).json(response('Internal Server Error', false, null))
}
