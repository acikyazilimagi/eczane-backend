const { sql } = require('./connect')
const locations = require('../../data/locations.json')
const cities = require('../../data/city-data.json')

const seedCityData = async () => {
  try {
    cities.forEach(async (city) => {
      // prepare city data
      const c = { name: city.key }
      const cityId = city.id

      let result = await sql`insert into cities ${sql(c, 'name')}`

      // prepare districts
      const districts = city.districts.map((d, index) => {
        return { name: d.key, cityId }
      })
      result = await sql`insert into districts ${sql(districts, 'name', 'cityId')}`
    })
  } catch (e) {
    return null
  }
}

const seedTypeData = async () => {
  try {
    // types
    const types = require('../../data/types.json')
    let result = await sql`insert into types ${sql(types, 'name')}`

    // subtypes
    const subtypes = require('../../data/subtypes.json')
    result = await sql`insert into subtypes ${sql(subtypes, 'name', 'typeId')}`
    return result
  } catch (e) {
    return null
  }
}

const seedLocationData = async () => {
  const locationsMapped = locations.map((l, index) => ({
    ...l,
    workingHours: l.workingHours || '',
    additionalAddressDetails: l.addressDetails,
    code: index + 1,
  }))

  try {
    let result = await sql`insert into locations ${sql(
      locationsMapped,
      'name',
      'phone',
      'address',
      'additionalAddressDetails',
      'workingHours',
      'latitude',
      'longitude',
      'cityId',
      'districtId',
      'typeId',
      'subTypeId',
      'code',
    )}`
    return result
  } catch (e) {
    return null
  }
}

exports.seed = {
  cityData: seedCityData,
  typeData: seedTypeData,
  locationData: seedLocationData,
}
