// 引用 Express 與 Express 路由器
const e = require('express')
const express = require('express')
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

// 定義首頁路由
router.get('/', (req, res) => {
  Restaurant.find() // 抓取 Restaurant model 全部的資料
    .lean() // mongoose model 物件傳送乾淨的 JavaScript 資料清單
    .sort({ _id: 'asc' }) //desc
    .then(restaurants => res.render('index', { restaurants })) // 資料送給 index 模板
    .catch(error => console.log(error))
})

// 設置收尋路由
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const sort = req.query.sort.trim().toLowerCase()

  let sortCondition = {}

  // 判斷當前使用者選擇的排序
  switch (sort) {
    case 'a > z':
      sortCondition = { name: 'asc' }
      break;
    case 'z > a':
      sortCondition = { name: 'desc' }
      break;
    case '類別':
      sortCondition = { category: 'asc' }
      break;
    case '地區':
      sortCondition = { location: 'asc' }
      break;
    default:
      sortCondition = { name: 'asc' }
  }

  //取得所有餐廳資料
  return Restaurant.find()
    .lean()
    .sort(sortCondition) //asc, desc
    .then(restaurant => {
      const filterRestaurants = restaurant.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
      })

      res.render('index', { restaurants: filterRestaurants, keyword })
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router