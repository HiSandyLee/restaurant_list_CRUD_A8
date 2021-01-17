const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {


  res.render('index', { restaurants: restaurantList.results })
})


app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})