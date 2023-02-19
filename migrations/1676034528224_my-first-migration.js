exports.up = (pgm) => {
  pgm.createTable('cities', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })

  pgm.createTable('districts', {
    id: 'id',
    name: { type: 'varchar(200)', notNull: true },
    cityId: { type: 'integer', notNull: true, references: 'cities' },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })

  pgm.createTable('types', {
    id: 'id',
    name: { type: 'varchar(200)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })

  pgm.createTable('subtypes', {
    id: 'id',
    typeId: { type: 'integer', references: 'types', notNull: true },
    name: { type: 'varchar(200)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })

  pgm.createTable('locations', {
    id: 'id',
    code: { type: 'varchar(200)' },
    name: { type: 'varchar(200)', notNull: true },
    phone: { type: 'varchar(20)' },
    address: { type: 'varchar(1000)' },
    additionalAddressDetails: { type: 'varchar(1000)' },
    workingHours: { type: 'varchar(100)' },
    latitude: { type: 'float8' },
    longitude: { type: 'float8' },
    cityId: { type: 'integer', notNull: true, references: 'cities' },
    districtId: { type: 'integer', notNull: true, references: 'districts' },
    typeId: { type: 'integer', notNull: true, references: 'types' },
    subTypeId: { type: 'integer', notNull: true, references: 'subtypes' },
    isValidated: {type: 'boolean', notNull: true, default: false},
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  
  // Seed the db

  const types = require('../data/types.json')
  for (const type of types) {
    pgm.sql(`INSERT INTO types VALUES (${type.id}, '${type.name}')`)
  }

  const subtypes = require('../data/subtypes.json')
  for (const subtype of subtypes) {
    pgm.sql(`INSERT INTO subtypes VALUES (${subtype.id}, ${subtype.typeId}, '${subtype.name}')`)
  }

  const cities = require('../data/cities-with-districts.json')
  for (const city of cities) {
    pgm.sql(`INSERT INTO cities VALUES (${city.id}, '${city.key}')`)
    for (const district of city.districts) {
      pgm.sql(`INSERT INTO districts VALUES (${district.id}, '${district.key}', ${city.id})`)
    }
  }

}
