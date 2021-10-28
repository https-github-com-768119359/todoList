const mongoose = require('mongoose')

// 创建todoList集合
const Schema = mongoose.Schema
const todoListSchema = new Schema({
    // 通过userId去查询到对应的userModel的_id
    userId: {
        type:Schema.Types.ObjectId
    },
    toDo: String,
    toDoDescription: String,
    date: String,
    imgQuery: String,
    // 是否完成，true则进入代办箱
    isFinish:Boolean
})

const todoListModel = mongoose.model('todoList', todoListSchema)

module.exports = todoListModel