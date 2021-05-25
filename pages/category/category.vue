<template>
	<view class="category_container">
		<!-- 侧边菜单栏 -->
		<scroll-view class="menu_container" scroll-y>
			<view class="menu_item"
				v-for="(item, index) in menuList"
				:key="index"
				@click="showSelectMenuGoods(index)">
				<text class="menu_item_name"
					:class="currentIndex === index ? 'menu_item_name_active' : ''">
					{{item}}
				</text>
			</view>
		</scroll-view>
		
		<!-- 商品栏 -->
		<scroll-view class="goods_cate_container" scroll-y @scroll="scroll" :scroll-top="scrollTop">
			<view class="goods_cate_group"
				v-for="(item, index) in goodsCateList"
				:key="item.cat_id">
				<view class="category_title">
					<text class="separator">/</text>
					<text class="category_title_name">{{item.cat_name}}</text>
					<text class="separator">/</text>
				</view>
				<view class="goods_list">
					<navigator class="goods_item"
						v-for="(item2, index2) in item.children"
						:key="item2.cat_id"
						:url="`/pages/goodsList/goodsList?cid=${item2.cat_id}`"
						>
						<image :src="item2.cat_icon" mode="widthFix"></image>
						<view class="goods_name">{{item2.cat_name}}</view>
					</navigator>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import {request} from '../../request/request.js'
	export default {
		data() {
			return {
				menuList: [],
				goodsCateList: [],
				currentIndex: 0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				Cates: []
			}
		},
		onLoad() {
			this.getCategoryList(this.currentIndex)
			// 先判断本地缓存中有没有旧的数据
			// 获取本地缓存中的数据
			const Cates = uni.getStorageSync('cates')
			// 如果不存在，发送请求
			if(!Cates) {
				this.getCategoryList(this.currentIndex)
			} else {
				if(Date.now()-Cates.time > 1000*10) {
					// 重新发送请求
					this.getCategoryList(this.currentIndex)
				} else {
					// 可以使用旧的数据
					console.log('可以使用旧的数据')
					this.Cates = Cates.data
					this.menuList = this.Cates.map(item => item.cat_name)
					this.goodsCateList = this.Cates[this.currentIndex].children
				}
			}
		},
		methods: {
			async getCategoryList(currentIndex) {
				const {message} = await request('/categories')
				this.Cates = message
				// 把数据存入本地存储中
				uni.setStorageSync('cates', {time: Date.now(), data: this.Cates})
				this.menuList = this.Cates.map(item => item.cat_name)
				this.goodsCateList = this.Cates[currentIndex].children
				
			},
			showSelectMenuGoods(index) {
				this.currentIndex = index
				this.getCategoryList(index)
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			}
		}
	}
</script>

<style lang="scss">
.category_container {
	display: flex;
	height: calc(100vh - 188rpx);
	.menu_container {
		height: 100%;
		width: 180rpx;
		font-size: 30rpx;
		.menu_item {
			height: 80rpx;
			display: flex;
			align-items: center;
			padding: 20rpx 0;
			.menu_item_name {
				width: 100%;
				text-align: center;
			}
			.menu_item_name_active {
				border-left: 4rpx solid $shop-color;
				color: $shop-color;
			}
		}
	}
	.goods_cate_container {
		height: 100%;
		flex: 1;
		.goods_cate_group {
			margin-bottom: 40rpx;
			.category_title {
				display: flex;
				height: 80rpx;
				justify-content: center;
				align-items: center;
				.separator {
					color: #ccc;
				}
				.category_title_name {
					padding: 0 20rpx;
					font-size: 30rpx;
				}
			}
			.goods_list {
				display: flex;
				flex-wrap: wrap;
				.goods_item {
					width: 33.33%;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding-bottom: 10rpx;
					image {
						width: 50%;
					}
					.goods_name {
						font-size: 28rpx;
					}
				}
			}
		}
	}
}
</style>
