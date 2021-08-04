/* 第三方图片请求接口 https://pixabay.com/api/docs/ */
const IMG_BASE_URL = 'https://pixabay.com/api/'
export const imgRequest = (options) => {
	return new Promise((resolve,reject) => {
		uni.request({
			url:IMG_BASE_URL + options.url,
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
