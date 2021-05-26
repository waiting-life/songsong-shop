import config from './config'
let times = 0
export const request = (url, data = {}, method="GET") => {
	times++
	uni.showLoading({
		title: '加载中',
		mask:true
	})
  // const baseUrl = 'http://localhost:3000'
  return new Promise((resolve, reject) => {
    uni.request({
    // 本地host
    url: `${config.baseUrl}${url}`,
    // 真机
     data,
     method,
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