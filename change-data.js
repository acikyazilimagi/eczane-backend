let data = require('./data/locations.json')

data = data.map((d) => ({
  ...d,
  typeId: 2,
  subTypeId: 4,
}))

setTimeout(() => {
  require('fs').writeFileSync('./data/locations.json', JSON.stringify(data, null, 2))
}, 4000)
