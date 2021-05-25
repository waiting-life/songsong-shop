<template>
	<view class="goods_List_container">
		<search-input></search-input>
		<Tabs :tabs="tabs" @changeTab="changeTab">
			<view class="first_tab" v-if="tabs[0].isActive">
				<navigator class="goods_item_container"
					v-for="(item, index) in goodsList"
					:key="item.goods_id">
					<view class="goods_img_wrap">
						<image :src="item.goods_small_logo ?  item.goods_small_logo : 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'" mode="widthFix"></image>
					</view>
					<view class="goods_info_wrap">
						<view class="goods_name">{{item.goods_name}}</view>
						<view class="goods_price">{{item.goods_price}}</view>
					</view>
				</navigator>
			</view>
			<view class="" v-else-if="tabs[1].isActive">
				1
			</view>
			<view class="" v-else="tabs[2].isActive">
				2
			</view>
		</Tabs>
	</view>
</template>

<script>
	import {request} from '../../request/request.js'
	import SearchInput from '../../components/SearchInput.vue'
	import Tabs from '../../components/Tabs.vue'
	export default {
		data() {
			return {
				tabs: [
					{
						id: 0,
						value: '综合',
						isActive: true
					},
					{
						id: 1,
						value: '销量',
						isActive: false
					},
					{
						id: 2,
						value: '价格',
						isActive: false
					}
				],
				QueryParams: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: []
			}
		},
		components: {
			SearchInput,
			Tabs
		},
		onLoad(options) {
			const {cid} = options
			this.QueryParams.cid = cid
			this.getGoodsDetail() 
		},
		onReachBottom() {
			console.log(111)
		},
		methods: {
			async getGoodsDetail() {
				const {message} = await request('/goods/search', this.QueryParams )
				this.goodsList = message.goods
			},
			
			// 点击tab切换
			changeTab(id) {
				this.tabs.forEach(item => item.id===id ? item.isActive=true : item.isActive=false)
			}
		}
	}
</script>

<style lang="scss">
.goods_List_container {
	.first_tab {
	  .goods_item_container {
	    border-bottom: 1px solid #ccc;
	    display: flex;
	    .goods_img_wrap {
	      flex: 2;
	      display: flex;
	      align-items: center;
	      justify-content: center;
	      image {
	        width: 70%;
	      }
	    }
	    .goods_info_wrap {
	      flex: 3;
	      display: flex;
	      flex-direction: column;
	      justify-content: space-around;
	      .goods_name {
			  height: 80rpx;
			  overflow: hidden;
			  text-overflow: ellipsis;
			  display: -webkit-box;
			  -webkit-line-clamp: 2;
			  -webkit-box-orient: vertical;
			
	      }
	      .goods_price {
	        color: var(--themeColor);
	        font-size: 32rpx;
	      }
	    }
	  }
	}
}

</style>
