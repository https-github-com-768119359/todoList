module.exports = () => {
    const mongoose = require('mongoose')
    // 连接数据库
    mongoose.connect('mongodb://localhost/todoList', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.connection.once('open', () => {
        console.log('数据库已连接');
    });
}