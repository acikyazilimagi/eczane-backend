module.exports = {
  db: {
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT,
    database: process.env.PSQL_DB,
    password: process.env.PSQL_PASSWORD,
    username: process.env.PSQL_USER,
  },
  app: {
    port: process.env.ECZ_PORT || process.env.PORT || 8080,
  },
}
