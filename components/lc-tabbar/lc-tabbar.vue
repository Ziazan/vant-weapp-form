<template>
	<view class="tabbar">
		<van-tabbar :active="tabStore.tabbarActive" @change="onChange" :placeholder="true">
		  <van-tabbar-item v-for="(item,index) in tabStore.menu" :icon="item.icon">{{item.label}}</van-tabbar-item>
		</van-tabbar>
	</view>
</template>

<script setup>
	import { onMounted, ref } from "vue"
	import { useTabStore } from '@/stores/tabStore';
	
	const tabStore  = useTabStore();
	console.log(tabStore)
	
	
	const onChange = (e)=>{
		const active = e?.detail;
		const currentItem = tabStore.menu[active];
		if(currentItem.children?.length){
			tabStore.setTabbarActive(active)
			tabStore.setSubTabActive(0)
			const method = currentItem.children[0].isTabbarPath ? 'switchTab':'navigateTo';
			uni[method]({
				url: `/${currentItem.children[0].path}`
			})
		}else{
			tabStore.setTabbarActive(active)
			tabStore.setSubTabActive(0)
			uni.switchTab({
				url: `/${currentItem.path}`
			})
		}
		
	}
</script>

<style>

</style>