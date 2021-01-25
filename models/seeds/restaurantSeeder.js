const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mogodb connected!')
  restaurantList.forEach(restaurant => Restaurant.create(restaurant))
  console.log('done')
})
