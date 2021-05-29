<template>
	<view class="auth_container">
		<button type="primary" plain open-type="getUserInfo" @getuserinfo="handleGetUserInfo">
			获取授权
		</button>
	</view>
</template>

<script>
	import {login} from '../../utils/uni-api.js'
	import {request} from '../../request/request.js'
	export default {
		
		data() {
			return {
				
			}
		},
		methods: {
			async handleGetUserInfo(e) {
				console.log(e)
				try{
					// 获取用户信息
					const {encryptedData, rawData, signature, iv} = e.detail
					// 获取用户登陆成功后的token
					const {code} = await login()
					console.log(code)
					const loginParams = {encryptedData, rawData, signature, iv, code}
					// 发送请求，获取用户的token
					const {token} = await request({url: '/userwxlogin', data: loginParams, method: 'post'})
					// 把token存入缓存中
					uni.setStorageSync('token', token)
					uni.navigateBack({
						delta: 1
					})
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
			}
		}
	}
</script>

<style lang="scss">
.auth_container {
	
	button{
		width: 70%;
		margin: 40rpx auto;
	}
}
</style>
