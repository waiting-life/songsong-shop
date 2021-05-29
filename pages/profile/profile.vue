<template>
	<view class="profile_container">
		<view class="user_info_wrap">
			<image class="user_info_bg" :src="userInfo.avatarUrl" mode="aspectFill"></image>
			<view class="user_info" v-if="userInfo.nickName">
				<view class="user_info_avatar">
					<image :src="userInfo.avatarUrl" mode="widthFix"></image>
				</view>
				<view class="user_info_nickname">{{userInfo.nickName}}</view>
			</view>
			<navigator v-else url="/pages/login/login" class="btn_login user_info">
				<button type="primary" plain>登录</button>
			</navigator>
		</view>
		<view class="user_content_wrap">
			<view class="user_main">
				<!-- 历史足迹 -->
				<view class="history_wrap">
					<navigator v-for="(item, index) in historyList"
						:key="item.id">
						<view class="history_num">{{item.num}}</view>
						<view class="history_name">{{item.name}}</view>
					</navigator>
				</view>
				<!-- 订单 -->
				<view class="order_wrap">
					<view class="order_title">我的订单</view>
					<view class="order_content">
						<navigator v-for="(item, index) in orderList"
							:key="item.id">
							<view class="iconfont" :class="item.icon"></view>
							<view class="order_name">{{item.name}}</view>
						</navigator>
					</view>
				</view>
				<!-- 收货地址管理 -->
				<view class="address_wrap">收货地址管理</view>
				<!-- 应用信息相关 -->
				<view class="app_info_wrap">
					<view class="app_info_item">
						<text>联系客服</text>
						<text class="phone_number">400-618-4000</text>
					</view>
					<view class="app_info_item">
						<text>意见反馈</text>
					</view>
					<view class="app_info_item">
						<text>关于我们</text>
					</view>
				</view>
				<!-- 推荐 -->
				<view class="recommend_wrap">把应用推荐给其他人</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				historyList: [
					{
						id: 0,
						num: 0,
						name: '收藏的店铺'
					},
					{
						id: 1,
						num: 0,
						name: '收藏的商品'
					},
					{
						id: 2,
						num: 0,
						name: '关注的商品'
					},
					{
						id: 3,
						num: 0,
						name: '我的足迹'
					}
				],
				orderList: [
					{
						id: 0,
						name: '全部订单',
						icon: 'icon-ding_dan'
					},
					{
						id: 1,
						name: '待付款',
						icon: 'icon-fukuantongzhi'
					},
					{
						id: 2,
						name: '待收货',
						icon: 'icon-receipt-address'
					},
					{
						id: 3,
						name: '退款退货',
						icon: 'icon-tuihuotuikuan_dianpu'
					}
				]
			}
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				this.userInfo = uni.getStorageSync('userInfo') || {}
			}
		}
	}
</script>

<style lang="scss">
	.profile_container {
		background-color: #edece8;
		.user_info_wrap {
			width: 100%;
			height: 45vh;
			background-color: $font-color;
			position: relative;
			.user_info_bg {
				width: 100%;
				height: 100%;
				filter: blur(10rpx);
			}
			.btn_login {
				width: 160rpx;
			}
			.user_info {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				text-align: center;
				.user_info_avatar {
					width: 150rpx;
					height: 150rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.user_info_nickname {
					color: #fff;
					font-size: 36rpx;
					margin-top: 40rpx
				}
			}
		}
	
		.user_content_wrap {
			position: relative;
			.user_main {
				color: #666;
				position: absolute;
				width: 95%;
				top: -60rpx;
				left: 50%;
				transform: translateX(-50%);
				.history_wrap {
					display: flex;
					justify-content: space-between;
					background-color: #fff;
					padding: 10rpx 20rpx;
					navigator {
						text-align: center;
						.history_num {
							color: $font-color;
						}
						.history_name {
							font-size: 28rpx;
						}
					}
				}
				.order_wrap {
					background-color: #fff;
					margin-top: 20rpx;
					.order_title {
						padding: 20rpx;
						border-bottom: 2rpx solid #ccc;
					}
					.order_content {
						display: flex;
						justify-content: space-between;
						navigator {
							display: flex;
							flex-direction: column;
							align-items: center;
							padding: 20rpx;
							.iconfont {
								color: $font-color;
								font-size: 40rpx;
							}
							.order_name {
								font-size: 30rpx;
							}
						}
					}
				}
				.address_wrap {
					background-color: #fff;
					margin: 20rpx 0;
					padding: 20rpx;
				}
				.app_info_wrap {
					background-color: #fff;
					.app_info_item {
						padding: 20rpx;
						border-bottom: 2rpx solid #ccc;
						&:first-child {
							display: flex;
							justify-content: space-between;
						}
					}
				}
				.recommend_wrap {
					background-color: #fff;
					padding: 20rpx;
				} 
			} 
			
		}
		
	}
</style>
