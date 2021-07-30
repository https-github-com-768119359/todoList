<template>
	<view class="index">
		<u-navbar :is-back="false" v-if="isLogin">
			<view class="slot-wrap" @click="showDateChose">
				<u-icon name="calendar" color="#2AC940" size="40"></u-icon>
				{{todayDate}}
				{{week}}
			</view>
			<!-- 最近一周日期选择 -->
			<u-popup v-model="showDateChoice" border-radius="14">
				<view class="show-button">
					<u-button v-for="(item,index) in dateMessage" :plain="true"
						:custom-style="customStyle">{{item}}
					</u-button>
				</view>
			</u-popup>
		</u-navbar>
		<!-- todoList主体内容 -->
		<view class="container-main" v-if="isLogin">
			<view v-if="listData.length == 0">
				<image class="container-image" src="../../static/index/mian.png"></image>
				<text>暂无日程</text>
			</view>
			<view v-if="listData.length !== 0" class="showList">
				<!-- 标题卡片模式 -->
				<!-- 				<uni-card v-for="(item,index) in listData" @click="aditToDoForm(index)" :key="item._id"
					:title="item.toDo" mode="title" :is-shadow="true" :note="item.date">
					{{item.toDoDescription}}
				</uni-card> -->
			</view>
			<view v-if="showAdd" class="circleAdd" @click="showToDoForm">
				<view class="addPng">
					<image class="addPng-image" src="../../static/index/add.png" mode="scaleToFill"></image>
				</view>
			</view>
			<!-- 			<view v-if="showAdd" class="bin" @click="showFinishForm">
				<view style="z-index: 1000;position: fixed;bottom: 130rpx;margin-left: 110rpx;color: #4CD964;">
					{{isFinishNums}}
				</view>
				<view class="binPng">
					<image class="binPng-image" src="../../static/index/bin.png" mode="scaleToFill"></image>
				</view>
			</view> -->
			<!-- 			<uni-popup class="finish-popup" ref="finishList" type="left" background-color="#fff" @change="showAddPic">
				<view class="finish-title">
					<view class="finish-title-today">今天</view>
				</view>
				<scroll-view class="scroll-view" scroll-y="true" show-scrollbar='true'>
					<view style="display: flex;flex-direction: column;justify-content: space-between;"
						v-for="(item,index) in finishList" @click="aditFinishListToTrue(index)" :key="item._id">
						<view style="margin: 20rpx 60rpx;">
							<view class="">
								{{item.toDo}}
							</view>
							<view class="">
								{{item.date}}
							</view>
						</view>
					</view>
				</scroll-view>
			</uni-popup> -->

			<!-- 弹出层 -->
			<uni-popup class="uni-popup" ref="adit" type="bottom" background-color="#fff" @change="showAddPic">
				<view class="addToDoList" v-if="listData.length !== 0">
					<view class="toDoListTitle">
						<input v-model="listData[aditIndex].toDo" class="input-todo" type="text" value=""
							placeholder="准备做什么" />
					</view>
					<input v-model="listData[aditIndex].toDoDescription" class="input-todoDetails" type="text" value=""
						placeholder="添加描述" />
					<uni-datetime-picker type="time" @change="editDate"></uni-datetime-picker>
					<view style="display:flex;justify-content: space-around;margin: 150rpx auto;">
						<view style="color:#4CD964;" @click="aditToDoList(aditIndex)">保存</view>
						<view style="color:#4CD964;" @click="aditFinishList(aditIndex)">移入完成</view>
						<view style="color:#4CD964;" @click="deleteToDoList(aditIndex)">删除</view>
					</view>
				</view>
			</uni-popup>
			<uni-popup class="uni-popup" ref="show" type="bottom" background-color="#fff" @change="showAddPic">
				<view class="addToDoList">
					<view class="toDoListTitle">
						<input v-model="toDo" class="input-todo" type="text" value="" placeholder="准备做什么" />

					</view>
					<input v-model="toDoDescription" class="input-todoDetails" type="text" value=""
						placeholder="添加描述" />
					<uni-datetime-picker type="time" @change="changeDate"></uni-datetime-picker>
					<view style="display: flex;">
						<view style="color:#4CD964;margin: 150rpx auto;" @click="addToDoList">添加</view>
					</view>
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
				// 表单todoList相关数据
				aditIndex: 0,
				toDoListNums: 0,
				toDo: "",
				toDoDescription: "",
				date: "",
				// 是否进入完成箱子
				isFinish: false,
				isFinishNums: 0,
				showFinish: false,
				listData: [],
				finishList: [],
				// 是否有添加图片
				showAdd: true,
				// 时间
				dateMessage: [],
				todayDate: 0,
				week: '',
				// popup层
				showDateChoice: false,
				customStyle: {
					marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: '#2AC940'
				}
			}
		},
		beforeMount() {
			this.init()
			if (this.isLogin) {
				this.getToDoList()
				this.getFinishList()
			}
		},
		computed: {
			isLogin: {
				get() {
					return this.$store.state.isLogin
				},
				set(val) {
					this.$store.commit('setLogin', val)
				}
			},
			userId: {
				get() {
					return this.$store.state.userId
				},
				set(val) {
					this.$store.commit('setUserId', val)
				}
			}
		},
		components: {
			login
		},
		methods: {
			init() {
				let date = new Date()
				this.todayDate = (date.getMonth() + 1) + '-' + date.getDate()
				this.week = "星期" + "天一二三四五六".charAt(new Date().getDay())
				this.dateMessage = this.getDates(date)
			},
			// 获取最近一周
			getDates(currentTime) {
				var currentDate = new Date(currentTime)
				var timesStamp = currentDate.getTime();
				var currenDay = currentDate.getDay();
				var dates = [];
				for (var i = 0; i < 7; i++) {
					dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString()
						.replace(/\//g, '-') + "星期" + "天一二三四五六".charAt(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i -
							(currenDay + 6) % 7)).getDay()));
				}
				return dates
			},
			showToDoForm() {
				this.$refs.show.open('bottom')
				uni.hideTabBar()
			},
			showFinishForm() {
				this.$refs.finishList.open('left')
				uni.hideTabBar()
			},
			showDateChose() {
				this.showDateChoice = true
			},
			aditToDoForm(index) {
				this.$refs.adit.open('bottom')
				this.aditIndex = index
				uni.hideTabBar()
			},
			changeDate(time) {
				this.date = new Date()
				console.log(this.date)
				this.date = time
			},
			editDate(time) {
				this.listData[this.aditIndex].date = time
			},
			showAddPic() {
				this.showAdd = !this.showAdd
				uni.showTabBar()
			},
			// 修改已完成的todoList
			aditFinishList(aditIndex) {
				let data = {
					_id: this.listData[aditIndex]._id
				}
				const res = this.$request({
					url: `/aditFinishList/?isFinish=${!this.isFinish}`,
					method: 'POST',
					data: data
				})
				if (res) {
					this.isFinishNums++
				}
			},
			// 获取todoList
			async getToDoList() {
				const res = await this.$request({
					url: `/todoList/${this.userId}?isFinish=${this.isFinish}`
				})
				this.listData = res.data
				this.toDoListNums = res.data.length
			},
			async getFinishList() {
				const res = await this.$request({
					url: `/todoList/${this.userId}?isFinish=${!this.isFinish}`
				})
				this.finishList = res.data
				this.isFinishNums = res.data.length
			},
			// 新增todoList
			async addToDoList() {
				if (this.toDo !== '' && this.date !== '') {
					let data = {
						userId: this.userId,
						toDo: this.toDo,
						toDoDescription: this.toDoDescription,
						date: this.date,
						isFinish: this.isFinish
					}
					const res = await this.$request({
						url: '/todoList',
						method: "POST",
						data: data
					})
					if (res) {
						this.getToDoList()
						uni.showToast({
							title: "新建了todo清单"
						})
						this.toDo = ""
						this.toDoDescription = ""
						this.$refs.show.close('bottom')
						this.toDoListNums++
					}
				} else {
					uni.showToast({
						title: '标题、时间不能为空！',
						icon: "none"
					})
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
					url: '/aditList',
					method: "POST",
					data: data
				})
				if (res) {
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
					url: '/deleteList',
					method: "DELETE",
					data: {
						_id: this.listData[aditIndex]._id
					}
				})
				if (res) {
					this.getToDoList()
					uni.showToast({
						title: "删除成功"
					})
					this.$refs.adit.close('bottom')
				}
			},
			changeIsLogin(val) {
				this.isLogin = true
				this.userId = val
				this.getToDoList()
			}
		},
		watch: {
			inputAuto() {

			}
		}
	}
</script>

<style lang="scss">
	.index {
		.slot-wrap {
			font-size: 38rpx;
			font-family: "Comic Sans MS", "幼圆", "黑体", sans-serif;

			.show-button {
				font-family: "Comic Sans MS", "幼圆", "黑体", sans-serif;
			}
		}

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

			.bin {
				.binPng {
					.binPng-image {
						z-index: 999;
						position: fixed;
						bottom: 50rpx;
						width: 120rpx;
						height: 120rpx;
					}
				}
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

			.finish-popup {
				.finish-title {
					margin-top: 50rpx;
					display: flex;

					.finish-title-today {
						margin-bottom: 30rpx;
						color: #4CD964;
						margin-right: 350rpx;
					}
				}
			}

			.uni-popup {
				.addToDoList {
					height: 700rpx;

					input {
						margin-bottom: 10rpx;
					}

					.input-todo {}

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
