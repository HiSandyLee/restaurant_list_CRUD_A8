const express = require('express')// require packages used in the project
const exphbs = require('express-handlebars')// require handlebars in the project
const restaurantList = require('./restaurant.json')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')// 載入 method-override

const port = 3000

const routes = require('./routes')
require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))// setting static files
app.use(methodOverride('_method'))// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(routes)// routes setting

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})