const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  const restaurantOne = {
    id: 1,
    image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg',
    title: 'Sababa 沙巴巴中東美食',
    type: '中東料理',
    evaluation: 4.1
  }
  res.render('index', { restaurant: restaurantOne })
})


app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})