
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// Sort 
router.get('/', (req, res) => {
  const sort = req.query.sort
  Restaurant.find()
    .lean()
    .sort(sort)
    .then(restaurant => res.render('index', { restaurant, sort }))
    .catch(error => console.log(error))
})

module.exports = router
