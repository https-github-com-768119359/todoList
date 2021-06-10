module.exports = (app) => {
    const todoListModel = require('../models/todoListModel')
    // 查询 todoList
    // 查询时需要带上userId查询，确保查询到的是每个用户的todoList
    app.get('/todoList/:userId', (req, res) => {
        const userId = req.params.userId
        todoListModel.find({userId:userId}, (error, todoData) => {
            if (error)
                console.log(err)
            res.json(todoData)
        })
    })

    // 添加 todoList
    app.post('/todoList', (req, res) => {
        // 添加时注意加上userId
        todoListModel.create(req.body, (err, result) => {
            if (err)
                console.log(err)
            res.json(result)
        })
    })

    // 修改 todoList
    app.post('/aditList', (req, res) => {
        let id = req.body._id
        /**注意查询条件
         * 根据_id的值修改数据
         * */
        todoListModel.updateOne({
            _id: id
        }, {
            $set: req.body
        }, (err, result) => {
            if (err)
                console.log(err)
            res.json(result)
        })
    })

    // 删除 todoList
    app.delete('/deleteList', (req, res) => {
        let id = req.body._id
        todoListModel.deleteOne({
            _id: id
        }, (err, result) => {
            if (err)
                console.log(err)
            res.json(result)
        })
    })
}