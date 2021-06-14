<script>
	export default {
		onLaunch: function() {
			uni.getStorage({
				key: "userInfo",
				success: (res) => {
					if (res.data.username) {
						this.isLogin = true
						this.userId = res.data._id
					}
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
