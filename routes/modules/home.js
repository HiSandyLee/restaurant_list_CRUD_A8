// 引用 Express 與 Express 路由器
const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const sorting = {
    a: { _id: 'asc' },
    z: { _id: 'desc' },
  }
  const sort = req.query.sort
  Restaurant.find()// 取出 Restaurant model 裡的所有資料
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨的JS資料陣列
    .sort(sorting[sort]) // 根據 _id 升冪排序
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error)) //若發生意外執行錯誤處理
})


module.exports = router