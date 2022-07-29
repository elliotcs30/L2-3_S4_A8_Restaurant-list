const express = require('express') // 載入express
const exphbs = require('express-handlebars') // 載入handlebars
const bodyParser = require('body-parser') // 引用 body-parser
const methodOverride = require('method-override') // 載入method-override

const routes = require('./routes') // 引用路由器
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

// 設定樣版引擎
// 定義要使用的樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// 透過 app.set 告訴 express 說要設定 view engine 是handlebars
app.set('view engine', 'handlebars')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// setting static files
app.use(express.static('public'))

// 開啟並且監聽伺服器
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})