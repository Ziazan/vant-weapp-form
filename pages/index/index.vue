<!--
 * @Date: 2019-08-22 19:41:20
 * @LastEditTime: 2024-12-04 22:24:18
 * @Description: 请填写简介
-->
<template>
	<lc-sub-tab/>
	<view class="container">
		<van-card
			v-for="(item) in 10"
			:key="item"
			num="2"
			tag="标签"
			price="10.00"
			desc="描述信息"
			title="商品标题"
		>
  <view slot="footer">
    <van-button size="mini">按钮</van-button>
    <van-button size="mini">按钮</van-button>
  </view>
</van-card>

	</view>
	<lc-tabbar />
</template>

<script setup lang="ts">
	import { ref, onMounted } from "vue"
	import { useTabStore } from '@/stores/tabStore';
	
	const tabStore = useTabStore();
	
	onMounted(()=>{
		tabStore.initActive();
	})
</script>

<style>
</style>
