const express = require('express')

// mongoose连接配置
require('./config/mongoose_connect')()

const app = express()

// 使用json的数据交换格式
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// api
require('./api/user')(app)
require('./api/todoList')(app)

app.listen(3000, () => {
    console.log('运行在http://localhost:3000')
})