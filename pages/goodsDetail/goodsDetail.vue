<template>
	<view class="goods_detail_container">
		<!-- 轮播图部分 -->
		<swiper indicator-dots autoplay circular class="detail_swiper_container">
			<swiper-item class="detail_swiper_item"
				v-for="(item, index) in goodsDetailSwipers"
				:key="item.pics_id"
				@click="handlePreviewImage(item.pics_big)">
				<image :src="item.pics_big" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="goods_price">￥{{goodsDetailObj.goods_price}}</view>
		<view class="goods_info_text">
			<view class="goods_name">{{goodsDetailObj.goods_name}}</view>
			<view class="goods_collect">
				<view class="iconfont icon-shoucang"></view>
				<view class="goods_collect_text">收藏</view>
			</view>
		</view>
		<view class="goods_detail_info">
			<view class="detail_info_title">图文详情</view>
			<view class="detail_info_content">
				<!-- 富文本 -->
				<rich-text :nodes="goodsDetailObj.goods_introduce"></rich-text>
			</view>
		</view>
		<view class="footer_tool_container">
			<view class="tool_item">
				<view class="iconfont icon-kefu"></view>
				<view>客服</view>
			</view>
			<view class="tool_item">
				<view class="iconfont icon-fenxiang"></view>
				<view>分享</view>
			</view>
			<navigator class="tool_item" open-type="switchTab" url="/pages/cart/cart">
				<view class="iconfont icon-gouwuche"></view>
				<view>购物车</view>
			</navigator>
			<view class="tool_item btn_cart"@click="handleAddCart">
				<view>加入购物车</view>
			</view>
			<view class="tool_item btn_buy">
				<view>立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {request} from '../../request/request.js'
	export default {
		data() {
			return {
				goodsDetailObj: {},
				goodsDetailSwipers: [],
				GoodsInfo: {}
			}
		},
		onLoad(options) {
			console.log(options)
			const {goods_id} = options
			this.getGoodsDetail(goods_id)
		},
		methods: {
			async getGoodsDetail(goods_id) {
				const {message} = await request(`/goods/detail?goods_id=${goods_id}`)
				const {goods_name, goods_price, goods_introduce} = message
				this.goodsDetailObj = {
					goods_name,
					goods_price, 
					goods_introduce
				}
				this.goodsDetailSwipers = message.pics
			},
			// 点击轮播图放大预览
			handlePreviewImage(current) {
				const urls = this.goodsDetailSwipers.map(item => item.pics_big)
				uni.previewImage({
					current,
					urls
				})
			},
			handleAddCart() {
				// 1. 获取缓存中的购物车数据
				const Cart = uni.getStorageSync('cart') || []
				// 2. 先判断当前商品是否存在
				let index = Cart.findIndex(item => item.goods_id === this.goodsDetailObj.goods_id)
				// 如果不存在
				if(index === -1) {
					this.goodsDetailObj.num = 1
					Cart.push(this.goodsDetailObj)
				} else {
					Cart[index].num++
				}
				// 把购物车数据添加回缓存中
				uni.setStorageSync('cart', Cart)
				uni.showToast({
					title: '加入成功',
					icon: 'success',
					// true 防止用户手抖疯狂点击按钮
					mask: true
				})
			}
		}
	}
</script>

<style lang="scss">
.goods_detail_container {
	position: relative;
	padding-bottom: 90rpx; 
	.detail_swiper_container {
		height: 70vw;
		.detail_swiper_item {
			width: 100%;
			display: flex;
			justify-content: center;
			image{
				width: 60%;
			}
		}
	}
	
	.goods_price {
		font-size: 32rpx;
		color: $font-color;
		font-weight: 600;
		padding: 20rpx;
	}
	.goods_info_text {
		display: flex;
		justify-content: space-between;
		border-top: 5rpx solid #dedede;
		padding: 10rpx 0;
		.goods_name {
			flex: 5;
			font-size: 30rpx;
			padding: 0 10rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.goods_collect {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			border-left: 2rpx solid #ccc;
		}
	}
	.goods_detail_info {
		.detail_info_title {
			font-size: 32rpx;
			color: $font-color;
			font-weight: 700;
			padding: 20rpx;
			border-bottom: 15rpx solid #dedede;
			border-top: 15rpx solid #dedede;
		}
		.detail_info_content {
			
		}
	}
	.footer_tool_container {
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		height: 90rpx;
		.tool_item {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			
		} 
		.btn_cart, .btn_buy {
			flex: 2;
			color: #fff;
			font-size: 30rpx;
			font-weight: 600;
			height: 100%;
		}
		.btn_cart {
			background-color: #ffa500;
		}
		.btn_buy {
			background-color: $font-color;
		}
	}
}
</style>
