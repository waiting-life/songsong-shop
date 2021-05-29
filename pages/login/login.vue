<template>
	<view class="login_container">
		<button type="primary" plain @click="handleGetUserInfo">
			登录
		</button>
		
	</view>
</template>

<script>
	import { request } from '../../request/request.js'
	import {getUserProfile} from '../../utils/uni-api.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			async handleGetUserInfo(e) {
				const {userInfo} = await getUserProfile() 
				uni.setStorageSync('userInfo', userInfo)
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.login_container {
		button {
			width: 70%;
			margin: 40rpx auto;
		}
	}
</style>
