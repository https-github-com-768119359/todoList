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

## 3. 2021-06-07

- [x] 首页样式
- [x] 首页添加下拉框弹出

## 4. 2021-06-08

- [x] 用户界面的todoList的后端增删改查
- [x] 用户界面的todoList的前端页面展示

## 5. 2021-06-09

- [x] 后端代码部署到服务器
- [x] 登录界面
- [x] 封装登录界面为组件
- [x] 修复空数组无法渲染问题（v-if控制是否渲染即可）
- [x] 封装前端网络请求
- [x] 用户的增删改查接口
- [x] 获取登录用户信息，为每一个用户配置数据库集合（通过userId索引查找）
- [x] 结构化后端代码

## 6. 2021-06-10

- [x] 用户注册
- [x] 后端代码部署到服务器

## 7. 2021-06-11

- [x] 修复注册bug
- [x] 用户界面开发
- [ ] 保持登录状态（Vuex）
- [ ] 日历开发（按照日期展示不同的todoList）

### 7.1 遇到的坑

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
