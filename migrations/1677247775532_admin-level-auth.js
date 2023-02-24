/* eslint-disable camelcase */

exports.shorthands = undefined
const bcrypt = require('bcrypt')

exports.up = async (pgm) => {
  // Add a column to the table, named isActive default value is true

  // create new table named admin
  pgm.createTable('admins', {
    id: 'id',
    firstName: { type: 'varchar(100)', notNull: true },
    lastName: { type: 'varchar(100)', notNull: true },
    username: { type: 'varchar(100)', notNull: true },
    password: { type: 'varchar(100)', notNull: true },
    isActive: { type: 'boolean', notNull: true, default: false },
    isSuperAdmin: { type: 'boolean', notNull: true, default: false },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_USER_PASSWORD, 8)
  // create a new admin user
  await pgm.sql(`INSERT INTO admins VALUES (1, 'Admin', 'Admin', 'admin_user', '${hashedPassword}', true, true)`)

  pgm.addColumn('locations', {
    adminId: { type: 'integer', notNull: true, references: 'admin', default: 1 },
  })

  pgm.addColumn('types', {
    adminId: { type: 'integer', notNull: true, references: 'admin', default: 1 },
  })

  pgm.addColumn('subtypes', {
    adminId: { type: 'integer', notNull: true, references: 'admin', default: 1 },
  })

  // disable the created admin user from future use
  pgm.sql(`UPDATE admins SET isActive = false WHERE username = ${'admin_user'}`)
}

exports.down = (pgm) => {
  // Remove the column
  pgm.dropTable('admins')
}

// async function hashPassword(plainTextPassword) {
//   const password = user.password
//   const saltRounds = 10

//   const hashedPassword = await new Promise((resolve, reject) => {
//     bcrypt.hash(plainTextPassword, saltRounds, function (err, hash) {
//       if (err) reject(err)
//       resolve(hash)
//     })
//   })

//   return hashedPassword
// }
