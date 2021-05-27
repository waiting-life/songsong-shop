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
export const getSetting = () => {
	return new Promise((resolve, reject) => {
		uni.getSetting({
			success: (result) => {
				resolve(result)
			}, 
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export const chooseAddress = () => {
	return new Promise((resolve, reject) => {
		uni.chooseAddress({
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}
export const openSetting = () => {
	return new Promise((resolve, reject) => {
		uni.openSetting({
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}