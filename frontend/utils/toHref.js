/*
 * 跳转到指定位置
 * @param {selector} id或者class
 */

function toHref(selector) {
	return new Promise((resolve) => {
		let view = uni.createSelectorQuery().select(selector);
		view.fields({
			size: true,
			rect: true,
			scrollOffset: true
		}, (res) => {
			resolve(res);
		}).exec();
	})
}

module.exports = {
	toHref
}
