module.exports = {
  db: {
    host: process.env.ECZ_TEST_DB_HOST,
    port: process.env.ECZ_TEST_DB_PORT,
    database: process.env.ECZ_TEST_DB_NAME,
    password: process.env.ECZ_TEST_DB_PASSWORD,
    username: process.env.ECZ_TEST_DB_USER,
  },
  app: {
    port: process.env.ECZ_PORT || process.env.PORT || 8080,
  },
}
