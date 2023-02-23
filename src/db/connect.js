const postgres = require('postgres')
const { config } = require('../config')

var sql = postgres(config.db)

exports.sql = sql
