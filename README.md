# todoList

本项目打算开发出多端的todoList，以期能在任何地方、设备使用，同时服务器部署使用vercel和免费云数据存储库存储，通过修改配置重新打包你完全可以使用自己的数据库和网站来使用todoList

## 0. 进程

* 目前frontend部分仅为uniapp代码
* 后端通用各端

## 1. 采用技术

前端

* uniapp（安卓端\苹果端\小程序）
* electron （windows\mac）
* vue（web端）

后端

* express
* mongodb

部署

* vercel
* Mongodb Atlas

## 2.  一些问题

在修改了Mongodb的数据存储配置必须删除其模型所在的库并重启服务。