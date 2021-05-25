<template>
	<view class="tabs_container">
		<view class="tabs_title">
			<view class="title_item"
				:class="item.isActive ? 'title_item_active':''"
				v-for="(item, index) in tabs"
				:key="item.id"
				@click="toggleTab(item.id)">
				{{item.value}}
			</view>
		</view>
		<view class="tabs_content">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Tabs",
		data() {
			return {
				currentIndex: 0
			};
		},
		props: {
			tabs: {
				type: Array,
				default: []
			}
		},
		methods: {
			toggleTab(id) {
				this.$emit('changeTab', id)
			}
		}
	}
</script>

<style lang="scss">
	.tabs_container {
		.tabs_title {
			height: 80rpx;
			display: flex;
			align-items: center;
			.title_item {
				flex: 1;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.title_item_active {
				border-bottom: 5rpx solid $shop-color;
			}
			
		}
	}

</style>
