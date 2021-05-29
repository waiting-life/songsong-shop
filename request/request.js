import config from './config'
let times = 0
export const request = (params) => {
	// 判断url中是否带有/my/， 如果有，请求的是私有的路径，带上header token
	let header = {...params.header}
	if(params.url.includes('/my/')) {
		// 拼接header，带上token
		header['Authorization'] = uni.getStorageSync('token')
	}
	times++
	uni.showLoading({
		title: '加载中',
		mask:true
	})
  // const baseUrl = 'http://localhost:3000'
  return new Promise((resolve, reject) => {
    uni.request({
		...params,
		header,
		url: `${config.baseUrl}${params.url}`,
		// 真机
     
		 success: (result) => {
			 resolve(result.data)
		 },
		 fail: (err) => {
			 reject(err)
		 },
		 complete: () => {
			 times--
			 if(times === 0) {
				 uni.hideLoading()
			 } 
		 }
     // header: {
     //   cookie: wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1) : ''
     // },
     // success:(result) => {
     //   if(data.isLogin) {
     //     // 将用户的cookie存储到本地
     //     wx.setStorage({
     //       key: 'cookies',
     //       data: result.cookies
     //     });
     //   }
     //   resolve(result.data)
     // },
     // fail:(err) => {
     //   reject(err)
     // }
    })
  })
}