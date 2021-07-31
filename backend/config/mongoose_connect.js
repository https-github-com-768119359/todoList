module.exports = () => {
    const {MONGODB_PASSWORD} = require('./private');
    const mongoose = require('mongoose');
    // 连接数据库
    const uri = `mongodb+srv://reoreo:${MONGODB_PASSWORD}@cluster0.obwdu.mongodb.net/todoList?retryWrites=true&w=majority`
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.connection.once('open', () => {
        console.log('数据库已连接');
    });
    mongoose.connection.on('error', console.error);
}