<template>
	<view class="index">
		<!-- todoList主体内容 -->
		<view class="container-main" v-if="isLogin">
			<view v-if="listData.length == 0">
				<image class="container-image" src="../../static/index/mian.png"></image>
				<text>暂无日程</text>
			</view>
			<view v-if="listData.length !== 0" class="showList">
				<!-- 标题卡片模式 -->
				<uni-card v-for="(item,index) in listData" @click="aditToDoForm(index)" :key="item._id"
					:title="item.toDo" mode="title" :is-shadow="true" :note="item.date"
					thumbnail="/static/index/mian.png"
					>
					{{item.toDoDescription}}
				</uni-card>
			</view>
			<view class="circleAdd" @click="showToDoForm">
				<view class="addPng">
					<image class="addPng-image" src="../../static/index/add.png" mode="scaleToFill"></image>
				</view>
			</view>
			<uni-popup class="uni-popup" ref="adit" type="bottom" background-color="#fff">
				<!-- 困扰的bug，通过在外面嵌套一层v-if决定是否渲染，否则空数组渲染会报错，因为找不到 -->
				<!-- 太草了，搞了一个多小时，问题出在这个 -->
				<view class="addToDoList" v-if="listData.length !== 0">
					<view class="toDoListTitle" >
						<input v-model="listData[aditIndex].toDo" class="input-todo" type="text" value=""
							placeholder="准备做什么" />
						<view style="color:#4CD964;" @click="aditToDoList(aditIndex)">保存</view>
						<view style="color:#4CD964;" @click="deleteToDoList(aditIndex)">删除</view>
					</view>
					<input v-model="listData[aditIndex].toDoDescription" class="input-todoDetails" type="text" value=""
						placeholder="添加描述" />
					<uni-datetime-picker type="time" @change="editDate"></uni-datetime-picker>
				</view>
			</uni-popup>
			<uni-popup class="uni-popup" ref="show" type="bottom" background-color="#fff">
				<view class="addToDoList">
					<view class="toDoListTitle">
						<input v-model="toDo" class="input-todo" type="text" value="" placeholder="准备做什么" />
						<view style="color:#4CD964;" @click="addToDoList">添加</view>
					</view>
					<input v-model="toDoDescription" class="input-todoDetails" type="text" value=""
						placeholder="添加描述" />
					<uni-datetime-picker type="time" @change="changeDate"></uni-datetime-picker>
				</view>
			</uni-popup>
		</view>
		<!-- 登录组件 -->
		<view v-else>
			<login @changeIsLogin="changeIsLogin"></login>
		</view>
	</view>
</template>

<script>
	import login from '../../components/login/login.vue'
	export default {
		data() {
			return {
				// 表单相关数据
				aditIndex: 0,
				toDoListNums: 0,
				toDo: "",
				toDoDescription: "",
				date: new Date(),
				listData: [],

				// 是否登陆
				isLogin: false,
				
				// 登录账号信息
				userId:""
			}
		},
		components:{
			login
		},
		methods: {
			showToDoForm() {
				this.$refs.show.open('bottom')
			},
			aditToDoForm(index) {
				this.$refs.adit.open('bottom')
				this.aditIndex = index
			},
			changeDate(time) {
				this.date = time
			},
			editDate(time) {
				this.listData[this.aditIndex].date = time
			},
			// 获取todoList
			async getToDoList() {
				const res = await this.$request({
					url:`/todoList/${this.userId}`
				})
				this.listData = res.data
				this.toDoListNums = res.data.length
			},
			// 新增todoList
			async addToDoList() {
				let data = {
					userId:this.userId,
					toDo: this.toDo,
					toDoDescription: this.toDoDescription,
					date: this.date
				}
				const res = await this.$request({
					url:'/todoList',
					method: "POST",
					data: data
				})
				if(res){
					this.getToDoList()
					uni.showToast({
						title: "新建了todo清单"
					})
					this.toDo = ""
					this.toDoDescription = ""
					this.$refs.show.close('bottom')
					this.toDoListNums++
				}
			},
			// 修改 todoList
			async aditToDoList(aditIndex) {
				let data = {
					_id: this.listData[aditIndex]._id,
					toDo: this.listData[aditIndex].toDo,
					toDoDescription: this.listData[aditIndex].toDoDescription,
					date: this.listData[aditIndex].date
				}
				const res = await this.$request({
					url:'/aditList',
					method: "POST",
					data: data
				})
				if(res){
					this.getToDoList()
					uni.showToast({
						title: "保存成功"
					})
					this.$refs.adit.close('bottom')
				}
			},
			// 删除 toDoList
			async deleteToDoList(aditIndex) {
				const res = await this.$request({
					url:'/deleteList',
					method: "DELETE",
					data: {
						_id: this.listData[aditIndex]._id
					}
				})
				if(res){
					this.getToDoList()
					uni.showToast({
						title: "删除成功"
					})
					this.$refs.adit.close('bottom')
				}
			},
			changeIsLogin(val){
				this.isLogin = true
				this.userId = val
				this.getToDoList()
			}
		}
	}
</script>

<style lang="scss">
	.index {
		.container-main {
			.showList {
				margin-top: 150rpx;
				width: 750rpx;

				.uni-card__title-content-title {
					color: #333333;
					font-size: 38rpx;
				}

				.listItem {
					display: flex;
					justify-content: space-between;
					margin: 20rpx 30rpx;
					background-color: #efefef;
					border-radius: 20rpx;

					.listItem-toDo {
						color: black;
						font-size: 50rpx;
					}

					.listItem-toDoDescription {
						font-size: 38rpx;
					}

					.listItem-date {
						font-size: 28rpx;
						margin: auto auto;
					}
				}
			}

			.container-image {
				display: block;
				margin: 375rpx auto 90rpx;
				width: 400rpx;
				height: 400rpx;
			}

			text {
				display: block;
				text-align: center;
				color: #828282
			}

			.circleAdd {
				z-index: 999;
				// 让子类居中
				display: flex;
				align-items: center;
				justify-content: center;
				position: fixed;
				bottom: 50rpx;
				left: 600rpx;
				width: $circlesize;
				height: $circlesize;
				// 在scss里不用使用calc()计算函数即可完成计算
				border-radius: $circlesize / 2;
				box-shadow: 0px 5px 4px #828282;
				background-color: #2AC940;
				float: right;
				margin-top: 130rpx;
				margin-right: 40rpx;

				.addPng-image {
					width: 20rpx;
					height: 20rpx;
				}
			}

			.uni-popup {
				.addToDoList {
					height: 300rpx;

					input {
						margin-bottom: 10rpx;
					}

					.input-todoDetails {
						margin: 30rpx 30rpx;
						font-size: 28rpx;
					}

					.toDoListTitle {
						display: flex;
						justify-content: space-between;
						flex-wrap: nowrap;
						margin: 30rpx 30rpx;
					}
				}
			}
		}

		
	}
</style>
