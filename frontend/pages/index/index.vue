<template>
  <view class="index">
    <!-- 头部导航栏 -->
    <u-navbar :is-back="false" v-if="isLogin">
      <!-- 显示当前日期 -->
      <view class="slot-wrap" @click="showDateChose">
        <u-icon name="calendar" color="#2AC940" size="40"></u-icon>
        {{ todayDate }}
      </view>
      <!-- 弹出层，显示可选的一周的时间 -->
      <u-popup v-model="showDateChoice" border-radius="14">
        <view class="show-button">
          <u-button
            v-for="(item, index) in dateMessage"
            @click="changeDate(item)"
            :plain="true"
            :custom-style="customStyle"
            :key="index"
          >
            {{ item }}
          </u-button>
        </view>
      </u-popup>
    </u-navbar>

    <!-- todoList主体内容 -->
    <Todolist v-if="isLogin" @addTodo="addTodo" />
    <!-- 登录组件 -->
    <view v-else>
      <Login @changeIsLogin="changeIsLogin" />
    </view>
  </view>
</template>

<script>
import Login from "../../components/Login.vue";
import Todolist from "../../components/Todolist.vue";
export default {
  data() {
    return {
      // 表单todoList相关数据
      aditIndex: 0,
      toDoListNums: 0,
      toDo: "",
      toDoDescription: "",
      date: "",
      // 选择日期
      dateMessage: [],
      todayDate: 0,
      week: "",
      // 选择日期popup层
      showDateChoice: false,
      // 修改弹出层button样式
      customStyle: {
        marginTop: "20px", // 注意驼峰命名，并且值必须用引号包括，因为这是对象
        color: "#2AC940",
      },
    };
  },
  beforeMount() {
    this.init();
    if (this.isLogin) {
      this.getToDoList();
      this.getFinishList();
    }
  },
  computed: {
    isLogin: {
      get() {
        return this.$store.state.isLogin;
      },
      set(val) {
        this.$store.commit("setLogin", val);
      },
    },
    userId: {
      get() {
        return this.$store.state.userId;
      },
      set(val) {
        this.$store.commit("setUserId", val);
      },
    },
  },
  components: {
    Login,
    Todolist,
  },
  methods: {
    // 初始化日期数据
    init() {
      let date = new Date();
      this.todayDate =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        "星期" +
        "天一二三四五六".charAt(new Date().getDay());
      this.week = "星期" + "天一二三四五六".charAt(new Date().getDay());
      this.dateMessage = this.getDates(date);
    },
    // 获取最近一周
    getDates(currentTime) {
      var currentDate = new Date(currentTime);
      var timesStamp = currentDate.getTime();
      var currenDay = currentDate.getDay();
      var dates = [];
      for (var i = 0; i < 7; i++) {
        dates.push(
          new Date(
            timesStamp + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7))
          )
            .toLocaleDateString()
            .replace(/\//g, "-") +
            "星期" +
            "天一二三四五六".charAt(
              new Date(
                timesStamp + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7))
              ).getDay()
            )
        );
      }
      return dates;
    },
    // 展示日期选择
    showDateChose() {
      this.showDateChoice = true;
    },
    // 修改已完成的todoList
    async aditFinishList(aditIndex) {
      let data = {
        _id: this.listData[aditIndex]._id,
      };
      const res = await this.$request({
        url: `/aditFinishList/?isFinish=${!this.isFinish}`,
        method: "POST",
        data: data,
      });
      if (res) {
        this.isFinishNums++;
      }
    },
    // 获取todoList
    async getToDoList() {
      const res = await this.$request({
        url: `/todoList/${this.userId}?isFinish=${this.isFinish}`,
      });
      this.listData = res.data;
      this.toDoListNums = res.data.length;
    },
    async getFinishList() {
      const res = await this.$request({
        url: `/todoList/${this.userId}?isFinish=${!this.isFinish}`,
      });
      this.finishList = res.data;
      this.isFinishNums = res.data.length;
    },
    // 新增todoList
    async addToDoList() {
      if (this.toDo !== "" && this.date !== "") {
        let data = {
          userId: this.userId,
          toDo: this.toDo,
          toDoDescription: this.toDoDescription,
          date: this.date,
          isFinish: this.isFinish,
        };
        const res = await this.$request({
          url: "/todoList",
          method: "POST",
          data: data,
        });
        if (res) {
          this.getToDoList();
          uni.showToast({
            title: "新建了todo清单",
          });
          this.toDo = "";
          this.toDoDescription = "";
          this.$refs.show.close("bottom");
          this.toDoListNums++;
        }
      } else {
        uni.showToast({
          title: "标题、时间不能为空！",
          icon: "none",
        });
      }
    },
    // 修改 todoList
    async aditToDoList(aditIndex) {
      let data = {
        _id: this.listData[aditIndex]._id,
        toDo: this.listData[aditIndex].toDo,
        toDoDescription: this.listData[aditIndex].toDoDescription,
        date: this.listData[aditIndex].date,
      };
      const res = await this.$request({
        url: "/aditList",
        method: "POST",
        data: data,
      });
      if (res) {
        this.getToDoList();
        uni.showToast({
          title: "保存成功",
        });
        this.$refs.adit.close("bottom");
      }
    },
    // 删除 toDoList
    async deleteToDoList(aditIndex) {
      const res = await this.$request({
        url: "/deleteList",
        method: "DELETE",
        data: {
          _id: this.listData[aditIndex]._id,
        },
      });
      if (res) {
        this.getToDoList();
        uni.showToast({
          title: "删除成功",
        });
        this.$refs.adit.close("bottom");
      }
    },
    changeIsLogin(val) {
      this.isLogin = true;
      this.userId = val;
      this.getToDoList();
    },
    changeDate(item) {
      this.todayDate = item;
      this.showDateChoice = false;
    },
    addTodo(value) {
      this.toDo = value.toDo;
      this.toDoDescription = value.toDoDescription;
      this.date = this.todayDate;
      this.addToDoList();
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  font-size: 15px;
  font-family: "Open Sans", sans-serif;
  color: #444;
  background-color: #fefefe;
  background-image: linear-gradient(
    $theme-color-green 0%,
    $theme-color-green-light 100%
  );
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px 10px;
  margin: 0;
  min-height: 100vh;
  position: relative;

  .slot-wrap {
    font-size: $uni-font-size-lg;
    font-family: "Comic Sans MS", "幼圆", "黑体", sans-serif;
  }
}
</style>
