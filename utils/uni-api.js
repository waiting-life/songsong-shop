export const showLoading = (title="加载中") => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title,
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}