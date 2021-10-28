<template>
  <view>
    <u-popup
      v-model="showChoosePics"
      mode="center"
      border-radius="14"
      width="600rpx"
      height="900rpx"
    >
      <view class="pics-main">
        <view class="pics-head" id="head-top">
          <view class="pics-head-pixabay">
            <u-search
              placeholder="请输入关键词"
              v-model="imgQuery"
              :show-action="true"
              action-text="搜索"
              :animation="true"
              @search="getImgUrl"
            ></u-search>
          </view>
        </view>
        <view class="pics-body">
          <view class="pics-body-imgs" v-for="item in imgUrl" :key="item">
            <image :src="item.largeImageURL" @click="chosePic"></image>
            <!-- TODO: 额外信息 -->
            <!-- <view class="pics-body-imgs-message">
              <u-icon
                name="eye"
                color="black"
                size="58"
                :label="item.views"
              ></u-icon>
              <u-icon
                name="heart"
                color="black"
                size="58"
                :label="item.likes"
              ></u-icon>
              <u-icon
                name="download"
                color="black"
                size="58"
                :label="item.downloads"
              ></u-icon>
              <u-icon
                name="chat"
                color="black"
                size="58"
                :label="item.comments"
              ></u-icon>
            </view> -->
          </view>
					<!-- TODO: 回到开头-->
          <!-- <view class="pics-body-toTop" @click="toHeadTop">
            <u-icon name="arrow-up" color="white" size="58"></u-icon>
          </view> -->
        </view>
        <view class="pics-foot"> </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { MY_API_KEY } from "../utils/auth.js";
import { toHref } from "../utils/toHref.js";
export default {
  name: "ImgUrl",
  data() {
    return {
			// 搜集到的传递给TodoList
      sTodolistInfo: {
        toDo: "",
        toDoDescription: "",
        date: "",
        imgUrl: "",
      },
      showChoosePics: true,
      imgUrl: [],
      imgQuery: "",
      // 返回顶部
    };
  },
  mounted() {
    this.getImgurl();
  },
  methods: {
    // 网络请求使用async await获取，不然res为undefined
    async getImgurl() {
      const res = await this.$imgRequest({
        url: `?key=${MY_API_KEY}&q=${this.imgQuery}`,
      });
      console.log(res);
      this.imgUrl = res.data.hits;
    },
    toHeadTop() {
      toHref(".pics-main").then((res) => {
        // TODO: 点击回到头部
        console.log(res); // null
        uni.pageScrollTo({
          scrollTop: 30,
        });
      });
    },
    getImgUrl(value) {
      this.imgQuery = value;
      this.getImgurl();
    },
		chosePic() {
			this.sTodolistInfo.imgUrl = this.imgQuery;
			this.showChoosePics = false;
			this.$emit("changeImgQuery",this.imgQuery);
		},
  },
};
</script>

<style lang="scss" scoped>
.pics {
  &-main {
    width: 600rpx;
    height: 900rpx;
    font-family: "Lucida Casual", "Comic Sans MS";
    font-size: $uni-font-size-lg;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &-head {
    height: 80rpx;
    display: flex;
    // TODO: 头部固定
    // position: sticky;
    // top: 0;
    padding: 0 20rpx;
    justify-content: space-between;
    align-items: center;
    border-bottom: $uni-bg-color-grey solid 2rpx;
  }

  &-body {
    &-imgs {
      &-message {
        display: flex;
        justify-content: space-between;
      }
    }

    &-toTop {
      position: sticky;
      // TODO: 中间固定
      // left: 50%;
      bottom: 0;
    }
  }
}
</style>
