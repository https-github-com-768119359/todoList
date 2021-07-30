const BASE_URL = 'http://localhost:3000'
// const BASE_URL = 'http://115.159.79.234:3000'
export const request = (options) => {
	return new Promise((resolve,reject) => {
		uni.request({
			url:BASE_URL + options.url,
			method:options.method || 'Get',
			data:options.data || {},
			success:(res)=>{
				if (res.statusCode !== 200) {
					uni.showToast({
						title: "请求数据失败",
						icon:"none"
					})
					return
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: "请求接口失败",
					icon:"none"
				})
				reject(err)
			}
		})
	})
}