<template>
	<view class="home_container">
		<search-input class="search_container"></search-input>
		<!-- 轮播图部分 -->
		<swiper class="swiper_container" indicator-dots autoplay circular>
			<swiper-item class="swiper_item"
				v-for="(item, index) in swiperData" 
				:key="item.goods_id">
				<image :src="item.image_src"></image>
			</swiper-item>
		</swiper>
		<!-- 分类导航模块 -->
		<view class="navigator_container">
			<view class="navigator_item"
				v-for="(item, index) in navigatorData"
				:key="item.name">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层模块 -->
		<view class="floor_container">
			<view class="floor_item"
				v-for="(item1, index1) in floorListData"
				:key="index1">
				<view class="floor_title">
					<image :src="item1.floor_title.image_src" mode="aspectFit"></image>
				</view>
				<view class="floor_goods_list">
					<navigator class="floor_goods_item"
						v-for="(item2, index2) in item1.product_list"
						:key="item2.name">
						<image :src="item2.image_src"></image>
					</navigator>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {request} from '../../request/request.js'
	
	import SearchInput from '../../components/SearchInput.vue'
	export default {
		data() {
			return {
				swiperData: [],
				navigatorData: [],
				floorListData: []
			}
		},
		components: {
			SearchInput
		},
		onLoad() {
			// 获取轮播图数据
			this.getSwiperData()
			// 获取导航栏数据
			this.getNavigatorData()
			// 获取楼层数据
			this.getFloorListData()
		},
		methods: {
			async getSwiperData() {
				try{
					const {message} = await request('/home/swiperdata')
					this.swiperData = message
				}catch{
					uni.showToast({
						title: '获取数据失败'
					})
				}
			},
			async getNavigatorData() {
				const {message} = await request('/home/catitems')
				this.navigatorData = message
			},
			async getFloorListData() {
				const {message} = await request('/home/floordata')
				console.log(message)
				this.floorListData = message
			}
		}
	}
</script>

<style lang="scss">
	.home_container {
		.swiper_container {
			width: 100%;
			height: 380rpx;
			.swiper_item {
				image {
					width: 100%;
					height: 100%;
				}
			}

		}
		.navigator_container {
			display: flex; 
			align-items: center;
			
			.navigator_item {
				flex: 1;
				height: 200rpx; 
				padding: 20rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.floor_container {
			.floor_item {
				
				.floor_title {
					height: 80rpx;
					image {
						height: 100%;
					}
				}
				.floor_goods_list {
					height: 420rpx;
					overflow: hidden;
					padding: 10rpx;
					.floor_goods_item {
						float: left;
						width: 33.33%;
						height: 100%;
						&:nth-last-child(-n+4) {
							height: (33.33vw * 386 / 232 / 2);
							border-left: 10rpx solid #fff;
						}
						&:nth-child(2),
						&:nth-child(3) {
							border-bottom: 10rpx solid #fff;
						}
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
</style>
