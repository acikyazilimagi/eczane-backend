const postgres = require('postgres')

const sql = postgres({
  /* options */
  host: process.env.PSQL_HOST,
  port: process.env.PSQL_PORT,
  database: process.env.PSQL_DB,
  password: process.env.PSQL_PASSWORD,
  username: process.env.PSQL_USER,
})

exports.sql = sql
