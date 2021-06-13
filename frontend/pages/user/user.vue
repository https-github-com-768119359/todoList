<template>
	<view class="user">
		<view class="headImg">
			<image src="../../static/index/mian.png"></image>
		</view>
		<view class="message" @click="userDetails">
			<text class="user_title">用户名：{{username}}</text>
			<text class="user_message">前往完善用户信息</text>
		</view>
		<button type="primary" class="exit" @click="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				password:""
			}
		},
		beforeCreate() {
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					console.log(res)
					this.username = res.data.username
					this.password = res.data.password
				}
			})
		},
		computed: {
			isLogin: {
				get() {
					return this.$store.state.isLogin
				},
				set(val) {
					this.$store.commit('setLogin', val)
				}
			}
		},
		methods: {
			logout() {
				uni.showModal({
					title:`是否登出账号${this.username}?`,
					content: `注意：您的账号将在退出时删除本地账号缓存，请注意保存账号密码`,
					success: (res) => {
						if (res.confirm) {
							uni.reLaunch({
								url: '../index/index',
								success: () => {
									this.isLogin = false
									uni.removeStorage({
										key:'userInfo'
									})
									uni.showToast({
										title: `用户 ${this.username} 已成功登出！`,
										icon: "none"
									})
								}
							})
						}
					}
				})
			},
			userDetails() {
				uni.showModal({
					title:'用户信息',
					content:`用户账号：${this.username}
							用户密码：${this.password}`,
					showCancel:false
				})
			}
		}
	}
</script>

<style lang="scss">
	.user {
		display: flex;
		justify-content: flex-start;

		.headImg {
			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50rpx;
				margin: 20rpx 20rpx;
			}
		}

		.message {
			display: flex;
			flex-direction: column;
			margin: 20rpx 20rpx;

			.user_title {
				font-size: 38rpx;
				margin-bottom: 10rpx;
			}

			.user_message {
				color: #808080;
				font-size: 28rpx;
			}
		}

		.exit {
			font-size: 30rpx;
			width: 220rpx;
			height: 80rpx;
			border: 0;
			margin: auto auto;
		}
	}
</style>
