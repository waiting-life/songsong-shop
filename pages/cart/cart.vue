<template>
	<view class="cart_container">
		<!-- 收货地址 -->
		<view class="receive_address_wrap">
			<view class="address_btn" @click="handleChooseAddress">
				<button type="primary" plain open-type="getUserInfo">获取收货地址</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartList: []
			}
		},
		onLoad() {
			this.getCartList()
		},
		methods: {
			getCartList() {
				const Cart = uni.getStorageSync('cart')
				console.log(Cart)
				this.cartList = Cart
			},
			handleChooseAddress() {
				console.log(111)
			}
		}
	}
</script>

<style lang='scss'>
	.receive_address_wrap {
		.address_btn {
			padding: 20rpx;
			display: flex;
			justify-content: center;
			button {
				width: 60%;
			}
		}
 	}

</style>
