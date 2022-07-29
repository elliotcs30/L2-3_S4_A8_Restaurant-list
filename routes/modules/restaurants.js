const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 設置新增餐廳頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增資料 create 路由，新增完資料後將資料送給資料庫
router.post('/', (req, res) => {
  return Restaurant.create(req.body) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// 設置 detail 頁面路由
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// 設置 edit 頁面路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 更新資料 edit 路由，更新完資料後將資料送給資料庫
router.put('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body) // 找到對應的資料後整個一起更新
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 設置 delete 路由
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router