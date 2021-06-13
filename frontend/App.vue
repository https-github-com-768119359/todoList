<script>
	export default {
		onLaunch: function() {
			uni.getStorage({
				key: "userInfo",
				success: (res) => {
					if (res.data.username) {
						this.isLogin = true
						console.log(this.isLogin)
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
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
