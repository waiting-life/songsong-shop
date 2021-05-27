<template>
	<view class="cart_container">
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
		<view class="cart_list_container">
			<view class="cart_title">购物车</view>
			<view class="cart_main">
			    <view v-if="cartList.length">
				   <view class="cart_item"
						v-for="(item, index) in cartList"
						:key="item.goods_id">
						<checkbox-group class="cart_checkbox_wrap" @change="handleItemChange(index)">
							<checkbox :checked="item.checked"/>
						</checkbox-group>
						<view class="cart_goods_logo">
							<image :src="item.goods_big_logo" mode="widthFix"></image>
						</view>
						<view class="cart_goods_info">
							<view class="goods_name">{{item.goods_name}}</view>
							<view class="goods_handle_wrap">
								<view class="goods_price">￥{{item.goods_price}}</view>
								<view class="goods_calc_wrap">
									<view class="goods_calc_item btn_calc" @click="handleItemNumEdit(index, -1)">-</view>
									<view class="goods_calc_item goods_num">{{item.num}}</view>
									<view class="goods_calc_item btn_calc" @click="handleItemNumEdit(index, 1)">+</view>
								</view>
							</view>
						</view>
				   </view>
			    </view>
			    <view v-else>
			      购物车空空如也~
			    </view>
			</view>
		</view>
	
		<!-- 底部工具栏 -->
		<view class="footer_tool_container">
			<view class="all_checked_wrap">
				<checkbox-group name="" @change="handleAllChecked">
					<checkbox :checked="allChecked">全选</checkbox>
				</checkbox-group>
			</view>
			<view class="total_price_wrap">
				<view class="total_price">
					合计：<text class="total_price_text">￥{{totalPrice}}</text>
				</view>
				<view>包含运费</view>
			</view>
			<view class="order_pay_wrap">结算：({{totalNum}})</view>
		</view>
	</view>
</template>

<script>
	import {getSetting, openSetting, chooseAddress} from '../../utils/uni-api.js'
	export default {
		data() {
			return {
				cartList: [],
				address: {},
				allChecked: false,
				totalPrice: 0,
				totalNum: 0
			}
		},
		onShow() {
			// 1. 获取缓存中的收货地址
			this.address = uni.getStorageSync('address') || {}
			const {cityName, countyName, detailInfo} = this.address
			this.address.totalAddress = `${cityName}${countyName}${detailInfo}`
			this.getCartList()
			this.setCart(this.cartList)
			// 计算全选
			// 空数组调用every方法，返回值也为true
			// const allChecked = this.cartList ? this.cartList.every(item => item.checked) : false
			// let {totalPrice, totalNum} = this
			// let allChecked = true
			// this.cartList.forEach(item => {
			// 	if(item.checked) {
			// 		totalPrice += item.num * item.goods_price
			// 		totalNum += item.num
			// 	} else {
			// 		allChecked = false
			// 	}
			// })
			// this.allChecked = this.cartList.length!==0 ? allChecked : false
			// this.totalPrice = totalPrice
			// this.totalNum = totalNum
		},
		methods: {
			getCartList() {
				this.cartList = uni.getStorageSync('cart') || []
			},
			async handleChooseAddress() {
				try{
					const result = await getSetting()
					const scopeAddress = result.authSetting['scope.address']
					if(scopeAddress === false) {
						await openSetting()
					}
					const result2 = await chooseAddress()
					uni.setStorageSync('address', result2)
				}catch(e){
					console.log(e)
				}
			},
			handleItemChange(index) {
				this.cartList[index].checked = !this.cartList[index].checked
				this.setCart(this.cartList)
				console.log(this.totalNum)
			},
			// 设置购物车状态同时重新计算底部工具栏数据 全选 总价格 购买数量
			setCart(Cart) {
				let totalNum = 0
				let totalPrice = 0
				let allChecked = true
				Cart.forEach(item => {
					if(item.checked) {
						totalPrice += item.num * item.goods_price
						totalNum += item.num
					} else {
						allChecked = false
					}
				})
				this.totalNum = totalNum
				this.totalPrice = totalPrice
				this.allChecked = this.cartList.length !== 0 ? allChecked : false
				uni.setStorageSync('cart', Cart)
			},
			// 全选和反选功能
			// 获取全选变量allChecked，直接取反
			// 遍历购物车数组，每一项的checked和allChecked保持一致
			
			handleAllChecked() {
				let {allChecked, cartList} = this
				allChecked = !allChecked
				cartList.forEach(item => item.checked = allChecked)
				this.cartList = cartList
				this.allChecked = allChecked
				uni.setStorageSync('cart', cartList)
				this.setCart(cartList)
			},
			
			// 对商品数量的编辑
			handleItemNumEdit(index, number) {
				if(this.cartList[index].num <=0 && number=== -1) {
					return
				} 
				this.cartList[index].num += number
				this.setCart(this.cartList)
			}
		}
	}
</script>

<style lang='scss'>
	.cart_container {
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
	.cart_list_container {
		.cart_title {
			font-size: 38rpx;
			padding: 20rpx;
			border-bottom: 5rpx solid $font-color;
			border-top: 5rpx solid $font-color;
		}
		.cart_main {
			.cart_item {
				display: flex;
				align-items: center;
				padding: 10rpx;
				border-bottom: 4rpx solid #ccc;
				.cart_checkbox_wrap {
					flex: 1;
				}
				.cart_goods_logo {
					flex: 2;
					image {
						width: 80%;
					}
				}
				
				.cart_goods_info {
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
							.btn_calc {
								border: 2rpx solid #ccc;
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
		bottom: 100rpx;
		height: 90rpx;
		background-color: #fff;
		display: flex;
		border-top: 2rpx solid #ccc;
		.all_checked_wrap {
			flex: 2;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
		}
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
