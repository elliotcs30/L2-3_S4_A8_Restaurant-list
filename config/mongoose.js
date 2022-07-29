// 載入 mongoose
const mongoose = require('mongoose')
// 設定與 mongoDB 連線
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線
const db = mongoose.connection

// DB 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// DB 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db