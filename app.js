const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') // 載入 mongoose
const restaurantList = require('./restaurant.json')
const port = 3000
const restaurant = require('./models/restaurant')
const Restaurant = require('./models/restaurant')

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

app.get('/', (req, res) => {
  Restaurant.find()// 取出 Restaurant model 裡的所有資料
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨的JS資料陣列
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error)) //若發生意外執行錯誤處理
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })

  res.render('index', { restaurants, keyword, })
})

app.get('/restaurant/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

//new路由
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

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})