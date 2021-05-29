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

export const showModal = ( title= '', content='') => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title,
			content,
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}
export const showToast = ({title, content}) => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title,
			content,
			icon: 'none',
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export const login = () => {
	return new Promise((resolve, reject) => {
		uni.login({
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export const requestPayment = (pay) => {
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			...pay,
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}


export const getUserInfo = ({provider="weixin", loginRes}) => {
	return new Promise((resolve, reject) => {
		uni.getUserInfo({
			provider,
			success: (loginRes) => {
				resolve(loginRes)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export const getUserProfile = () => {
	return new Promise((resolve, reject) => {
		uni.getUserProfile({
		    desc:'Wexin',     // 这个参数是必须的
		    success: result =>{
		        resolve(result)
		    },
		    fail: err =>{
		        reject(err)
		    }
		})
	})
}
