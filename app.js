const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  const restaurantList = [
    {
      id: 1,
      image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg',
      title: 'Sababa 沙巴巴中東美食',
      type: '中東料理',
      evaluation: 4.1
    },
    {
      id: 2,
      image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5628/02.jpg',
      title: '梅子鰻蒲燒專賣店',
      type: '日本料理',
      evaluation: 4.3
    },
    {
      id: 3,
      image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5629/03.jpg',
      title: 'ZIGA ZIGA',
      type: '義式餐廳',
      evaluation: 4.2
    },
    {
      id: 4,
      image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5630/04.jpg',
      title: '艾朋牛排餐酒館',
      type: '美式',
      evaluation: 4.2
    },
    {
      id: 5,
      image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5631/05.jpg',
      title: 'Gusto Pizza',
      type: '義式餐廳',
      evaluation: 4.7
    },
    {
      id: 6,
      image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5632/06.jpg',
      title: 'WXYZ Bar',
      type: '酒吧',
      evaluation: 4.3
    },
    {
      id: 7,
      image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5633/07.jpg',
      title: 'Fika Fika Cafe',
      type: '咖啡',
      evaluation: 4.3
    },
    {
      id: 8,
      image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5634/08.jpg',
      title: '布娜飛比利時啤酒餐廳',
      type: '義式餐廳',
      evaluation: 4.7
    },


  ]

  res.render('index', { restaurants: restaurantList })
})


app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})