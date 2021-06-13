<template>
	<view class="user">
		<view class="headImg"><image src="../../static/index/mian.png"></image></view>
		<view class="message">
			<text class="user_title">用户名：{{}}</text>
			<text class="user_message">前往完善用户信息</text>
		</view>
		<button type="primary" class="exit">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.user{
		display: flex;
		justify-content: flex-start;
		.headImg{
			image{
				width:100rpx;
				height:100rpx;
				border-radius: 50rpx;
				margin: 20rpx 20rpx;
			}
		}
		.message{
			display: flex;
			flex-direction: column;
			margin: 20rpx 20rpx;
			.user_title{
				font-size: 38rpx;
				margin-bottom: 10rpx;
			}
			.user_message{
				color: #808080;
				font-size: 28rpx;
			}
		}
		.exit{
			font-size: 30rpx;
			width:220rpx;
			height:80rpx;
			border:0;
			margin:auto auto;
		}
	}
</style>
