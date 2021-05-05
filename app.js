// require packages used in the project
const express = require('express')
// require handlebars in the project
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')// 載入 method-override
const app = express()
const port = 3000


mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})// 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
//once只會執行一次
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

// setting static files
app.use(express.static('public'))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// routes setting
//home page
app.get('/', (req, res) => {
  Restaurant.find()// 取出 Restaurant model 裡的所有資料
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨的JS資料陣列
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error)) //若發生意外執行錯誤處理
})

//search bar
// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword.trim()
//   const restaurants = restaurantList.results.filter(restaurant => {
//     return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
//   })

//   res.render('index', { restaurants, keyword })
// })

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  return Restaurant.find()
    .lean()
    .then(restaurants => {
      const restaurantList = restaurants.filter((search) => {
        return search.name.toLowerCase().includes(keyword) ||
          search.category.toLowerCase().includes(keyword)
      })
      res.render('index', { restaurants: restaurantList, keyword })
    })
    .catch(error => { console.log(error) })
})

//new
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body
  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

//show page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//edit
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})