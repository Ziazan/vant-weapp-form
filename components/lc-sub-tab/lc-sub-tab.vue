<template>
	<!-- marker: 使用sticky吸住顶部 -->
	<!-- <van-sticky v-show="tabStore?.currentTabs?.length > 1">
	<view class="sub-tab">
		
	</view>
	</van-sticky> -->
	<van-tabs v-show="tabStore?.currentTabs?.length > 1" :active="tabStore?.subTabActive" @change="onChange" sticky>
	  <van-tab v-for="item in tabStore?.currentTabs" :key="item.id" :title="item.label"></van-tab>
	</van-tabs>
</template>

<script setup>
	import { computed, onMounted, ref, toRaw } from "vue"
	import { useTabStore } from '@/stores/tabStore';
	
	const tabStore = useTabStore();
	const active = ref(0)
	const tabs = computed(()=>tabStore.currentTabs)
	
	const onChange = (e)=>{
		const active = e?.detail.index;
		const currentItem = tabStore.currentTabs[active];
		tabStore.setSubTabActive(active)
		const method = currentItem?.isTabbarPath ? 'switchTab':'navigateTo';
		uni[method]({
			url: `/${currentItem?.path}`
		})
	}
</script>

<style>

</style>