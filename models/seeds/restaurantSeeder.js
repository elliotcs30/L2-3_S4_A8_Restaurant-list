// require restaurant model
const Restaurant = require('../restaurant')
// require file
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')

  Restaurant.create(restaurantList)
    .then(() => {
      console.log('DONE')
    })
    .catch(error => {
      console.log(error)
    })
})
