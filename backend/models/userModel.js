const mongoose = require('mongoose')
// 创建用户集合
// 用户和todoList是一对多关系
const Schema = mongoose.Schema
const userMessageSchema = new Schema({
    username: String,
    password: String
})

const userModel = mongoose.model('userMessage', userMessageSchema)

module.exports = userModel