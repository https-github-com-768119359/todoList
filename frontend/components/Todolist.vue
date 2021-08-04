<template>
	<view class="todolist-wraper">
		<!-- 添加todolist -->
		<!-- 是否展示表单 -->
		<view class="todolist-showTodo" @click="hideTodolistForm">
			<u-icon name="arrow-down" color="#ffffff" size="48"></u-icon>
		</view>
		<!-- 表单内容 -->
		<view class="todolist-edit" v-show="isShowTodolistForm">
			<u-form :model="todolistInfo" ref="todolistInfoForm" class="todolist-form">
				<!-- 标题 -->
				<view class="todolist-input-todo">
					<u-input v-model="todolistInfo.toDo" inputAlign="center" type="text" border="true"
						placeholder="标题" />
				</view>
				<!-- 选择图片 -->
				<view class="todolist-input-imgUrl">
					<u-input v-model="todolistInfo.imgUrl" type="text" border="true" placeholder="图片路径" />
					<u-button :custom-style="customStyle" type="primary" shape="square" :ripple="true"
						ripple-bg-color="#03c90a" @click="changeShowChoosePics">选择图片
					</u-button>
					<ImgUrl ref="imgUrlEdit" />
				</view>
				<!-- 新建表单 -->
				<view class="todolist-input-todoDescriptionWithButton">
					<u-input v-model="todolistInfo.toDoDescription" type="textarea" border="true" placeholder="内容"
						height="100" auto-height="true" />
					<u-button :custom-style="customStyle" type="primary" shape="square" :ripple="true"
						ripple-bg-color="#03c90a">新建清单
					</u-button>
				</view>
			</u-form>
		</view>
		<!-- 展示todolist -->
		<u-card>
			<!-- 头部 -->
			<view class="todolist-card-head" slot="head">
				<u-icon name="list-dot" size="34" color="" label="已完成"></u-icon>
			</view>
			<!-- 主体内容 -->
			<view class="todolist-card-body" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-row-between u-p-t-0"
					v-for="(item,index) in todolistData" :key="index">
					<view class="u-body-item-description u-line-2">{{item.toDo}}</view>
					<image :src="item.imgUrl" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 尾部 -->
			<view class="todolist-card-foot" slot="foot">
				<u-icon name="zhuanfa" size="34" color=""></u-icon>
			</view>
		</u-card>
	</view>
</template>

<script>
	import ImgUrl from './ImgUrl.vue';
	export default {
		components: {
			ImgUrl
		},
		data() {
			return {
				// todolist表单数据
				todolistInfo: {
					toDo: "",
					toDoDescription: "",
					date: "",
					imgUrl: ""
				},
				// todolist后端返回的数据
				todolistData: [{
						toDo: '开始你的新建todolist',
						toDoDescription: "点击上方箭头可以隐藏表单输入",
						date: "2021-8-2 星期一",
						imgUrl: "https://pixabay.com/get/g9dd673db48cb0f60ddc83bab70aafc5b366301ecf62804f877d41d68b6f44e7ee56d185c3ecd399e333cfe7d05e1171de7d053ab6d4b8cb3a8716cce158b8d5c_1280.jpg"
					},
					{
						toDo: '去上网',
						toDoDescription: "每天都要去上网，哈哈哈",
						date: "2021-8-2 星期一",
						imgUrl: "https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
					},
					{
						toDo: '去上班',
						toDoDescription: "每天都要去上班，呜呜呜",
						date: "2021-8-2 星期一",
						imgUrl: "https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
					}
				],
				// u-button样式
				customStyle: {
					backgroundColor: "#64c962"
				},
				// 是否展示todoList
				isShowTodolistForm: true
			}
		},
		methods: {
			hideTodolistForm() {
				this.isShowTodolistForm = !this.isShowTodolistForm
			},
			changeShowChoosePics() {
				this.$refs.imgUrlEdit.showChoosePics = true
			}
		},
	}
</script>

<style lang="scss" scoped>
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.todolist {
		&-showTodo {
			margin: 0 320rpx;
		}

		&-input-imgUrl {
			display: flex;
			justify-content: space-between;

			u-input {
				display: block;
				width: 500rpx;
			}

			u-button {
				margin: auto 0;
			}
		}
	}
</style>
