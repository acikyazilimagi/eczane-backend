const postgres = require('postgres')

var sql = null

if (process.env.NODE_ENV === 'production') {
  sql = postgres({
    /* options */
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT,
    database: process.env.PSQL_DB,
    password: process.env.PSQL_PASSWORD,
    username: process.env.PSQL_USER,
  })
}
else {
  // TODO: Handle TEST env here if needed for testing
  // At the moment it will be only for DEV
  
  sql = postgres({
    /* options */
    host: process.env.ECZ_DB_HOST,
    port: process.env.ECZ_DB_PORT,
    database: process.env.ECZ_DB_NAME,
    password: process.env.ECZ_DB_PASSWORD,
    username: process.env.ECZ_DB_USER,
  })
}

exports.sql = sql
