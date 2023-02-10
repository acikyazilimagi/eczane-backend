const { sql } = require('./connect')

exports.getAll = async () => {
  try {
    const [hospitals, pharmacies] = await Promise.all([sql`select * from locations`])

    return [...hospitals, ...pharmacies]
  } catch (e) {
    return null
  }
}

exports.write = async (locations) => {
  const locationsMapped = locations.map((l) => ({
    ...l,
    workingHours: l.workingHours || '',
    additionalAddressDetails: l.addressDetails,
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
      'code',
      'subTypeId',
    )}`
    return result
  } catch (e) {
    return null
  }
}
