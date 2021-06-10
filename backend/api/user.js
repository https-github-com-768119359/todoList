module.exports = (app) => {
    const userModel = require('../models/userModel')
    // 通过username查询用户，获得其_id值，用于查询todoList

    // resful风格 可以使用get请求获取到数据，不然就要用post请求了
    app.get('/userInfo/:username/:password', (req, res) => {
        let username = req.params.username
        let password = req.params.password
        userModel.findOne({
            username: username,
            password: password
        }, (error, userInfo) => {
            if (error)
                console.log(err)
            res.json(userInfo)
        })
    })

    // 获取所有的username
    app.get('/getAllUsername', (req, res) => {
        userModel.find({}, (error, userInfo) => {
            if (error)
                console.log(err)
            res.json(userInfo)
        })
    })

    // 新增用户
    app.post('/addUser', (req, res) => {
        userModel.create(req.body, (err, result) => {
            if (err)
                console.log(err)
            res.json(result)
        })
    })

    // 删除用户
    app.delete('/deleteUser', (req, res) => {
        let id = req.body._id
        userModel.deleteOne({
            _id: id
        }, (err, result) => {
            if (err)
                console.log(err)
            res.json(result)
        })
    })

    // 修改用户
    app.post('/aditUser', (req, res) => {
        let id = req.body._id
        userModel.updateOne({
            _id: id
        }, {
            $set: req.body
        }, (err, result) => {
            if (err)
                console.log(err)
            res.json(result)
        })
    })
}