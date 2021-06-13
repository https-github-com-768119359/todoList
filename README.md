# todoList
使用uniapp，node的前后端分离todoList项目
## 1. 采用技术

前端

* uniapp

后端

* express
* mongodb
* pm2部署

测试

* Insomnia

## 2. 设计

* invision

## 3.  一些问题



### 3.1 部署到服务器后的问题

后端部署到服务器后，出现与本地测试不符合的bug，排查后发现是没有重启linux服务器mongodb的原因

代码里新增了：

```js
const userMessageSchema = new Schema({
    username:{
        type:String,
        unique:true
    },
    password: String
})
```

> username为唯一，遇到不符合的，res会返回空值，前端可以依次判断；
>
> 但是部署到服务器后，发现还是会导致反复注册，下面是解决方案；

*连接到 linux 服务器*

```bash
# 进入mongodb
mongo
# 删除todoList数据库
show database
use todoList
db.dropDatabase()
# 重启pm2
pm2 restart all
```

> 光删除也没用，一定要重启pm2进程；



