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
				username: ""
			}
		},
		beforeCreate() {
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.username = res.data.username
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
					content: `是否登出账号${this.username}?`,
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
				uni.showToast({
					title: '开发中',
					icon: "none"
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
