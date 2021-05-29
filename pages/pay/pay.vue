<template>
	<view class="pay_container">
		<!-- 收货地址 -->
		<view class="receive_address_wrap">
			<view class="address_btn" v-if="!address.userName" @click="handleChooseAddress">
				<button type="primary"plain>获取收货地址</button>
			</view>
			<view class="address_detail" v-else>
				<view class="receiver_first_raw">
					<view class="receiver_name">收货人：{{address.userName}}</view>
					<view class="reciver_phone">{{address.telNumber}}</view>
				</view>
				<view class="receiver_second_raw">{{address.totalAddress}}</view>
			</view>
		</view>
	
		<!-- 购物车列表数据 -->
		<view class="pay_list_container">
			<view class="pay_title">
				购物车
			</view>
			<view class="pay_main">
			    <view class="pay_item"
			    	v-for="(item, index) in cartList"
			    	:key="item.goods_id">
			    	<view class="pay_goods_logo">
			    		<image :src="item.goods_big_logo" mode="widthFix"></image>
			    	</view>
			    	<view class="pay_goods_info">
			    		<view class="goods_name">{{item.goods_name}}</view>
			    		<view class="goods_handle_wrap">
			    			<view class="goods_price">￥{{item.goods_price}}</view>
			    			<view class="goods_calc_wrap">
			    				<view class="goods_calc_item goods_num">X{{item.num}}</view>
			    			</view>
			    		</view>
			    	</view>
			    </view>
			</view>
		</view>
	
		<!-- 底部工具栏 -->
		<view class="footer_tool_container">
			<view class="total_price_wrap">
				<view class="total_price">
					合计：<text class="total_price_text">￥{{totalPrice}}</text>
				</view>
				<view>包含运费</view>
			</view>
			<view class="order_pay_wrap" @click="handleOrderPay">支付：({{totalNum}})</view>
		</view>
	</view>
</template>

<script>
	import {getSetting, openSetting, chooseAddress, showModal, showToast, requestPayment} from '../../utils/uni-api.js'
	import {request} from '../../request/request.js'
	export default {
		data() {
			return {
				cartList: [],
				address: {},
				totalPrice: 0,
				totalNum: 0
			}
		},
		onShow() {
			this.getInitPayData()
		},
		methods: {
			getInitPayData() {
				const cart = uni.getStorageSync('cart') || []
				this.address = uni.getStorageSync('address') || {}
				this.cartList = cart.filter(item => item.checked)
				cart.forEach(item => {
					this.totalPrice += item.num * item.goods_price
					this.totalNum+=item.num
				})
			},
			async handleOrderPay() {
				// console.log('已支付')
				try{
					// 1. 先判断缓存中有没有token
					const token = uni.getStorageSync('token')
					// 2. 没有，跳转到授权页面 进行获取token
					if(!token) {
						uni.navigateTo({
							url: '/pages/auth/auth',
						})
						return
					}
					// 有token，创建订单， 获取订单编号
					// console.log('已经存在token')
					// 准备请求头参数
					// const header  = {
					// 	Authorization: token
					// }
					// 准备请求体参数
					const order_price = this.totalPrice
					const consignee_addr = this.address.allAddress
					const cart = this.cartList
					let goods = []
					cart.forEach(item => goods.push({
						goods_id: item.goods_id,
						goods_number: item.num,
						goods_price: item.goods_price
					}))
					const orderParams = {order_price, consignee_addr, goods}
					// 准备发送请求，创建订单，获取订单编号
					const {order_number} = await request({url: '/my/orders/create', data: orderParams, mthod: 'post' })
					console.log(order_number)
					// 准备发起预支付的接口
					const {pay} = await request({url: '/my/orders/req_unifiedorder', method: 'post', data: {order_number}})
					// 发起微信支付
					await requestPayment(pay)
					// 查询后台，看下订单状态是否成功
					const result = await request({url: '/my/orders/chkOrder', method: 'post', data: {order_number}})
					console.log(result)
					showToast('支付成功')
				}catch(e){
					//TODO handle the exception
					showToast('支付失败')
				}
			}
		}
	}
</script>

<style lang='scss'>
	.pay_container {
		padding-bottom: 90rpx;
		position: relative;
	}
	.receive_address_wrap {
		.address_btn {
			padding: 20rpx;
			display: flex;
			justify-content: center;
			font-size: 22rpx;
			button {
				width: 60%;
			} 
			
		}
		.address_detail {
			padding: 20rpx;
			.receiver_first_raw {
				display: flex;
				justify-content: space-between;
			}
		}
 	}
	.pay_list_container {
		.pay_title {
			font-size: 38rpx;
			padding: 20rpx;
			border-bottom: 5rpx solid $font-color;
			border-top: 5rpx solid $font-color;
		}
		.pay_main {
			.pay_item {
				display: flex;
				align-items: center;
				padding: 10rpx;
				border-bottom: 4rpx solid #ccc;
				.pay_goods_logo {
					flex: 2;
					image {
						width: 80%;
					}
				}
				
				.pay_goods_info {
					flex: 4;
					font-size: 28rpx;
					display: flex;
					flex-direction: column;
					.goods_name {
						text-overflow: ellipsis;
						display: -webkit-box;
						overflow: hidden;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						margin-bottom: 30rpx;
					}
					.goods_handle_wrap {
						display: flex;
						justify-content: space-between;
						.goods_price {
							font-size: 32rpx;
							color: $font-color;
						}
						.goods_calc_wrap {
							display: flex;
							.goods_calc_item {
								width: 50rpx;
								height: 50rpx;
								display: flex;
								justify-content: center;
								align-items: center;
							}
						}
					}
				}
			}
		}
	}

	.footer_tool_container {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 90rpx;
		background-color: #fff;
		display: flex;
		border-top: 2rpx solid #ccc;
		.total_price_wrap {
			flex: 4;
			font-size: 30rpx;
			text-align: right;
			padding-right: 20rpx;
			.total_price {
				.total_price_text {
					color: $font-color;
					font-size: 34rpx;
					font-weight: 600;
				}
			}
		}
		.order_pay_wrap {
			flex: 2;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: $font-color;
			color: #fff;
			font-size: 32rpx;
			font-weight: 600;
		}
	}
</style>
