<template>
	<view class="search_input">
	  <navigator url="/pages/search/search" open-type="navigate">搜索</navigator>
	</view>
</template>

<script>
	export default {
		name:"SearchInput",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.search_input {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 80rpx;
	padding: 10rpx;
	background-color: $shop-color;
	navigator {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  height: 60rpx;
	  border-radius: 26rpx;
	  background-color: #fff;
	  width: 100%;
	}
}

</style>
