<template>
	<lc-sub-tab/>
	<view>
		<van-button @click="handleClick">跳转</van-button>
	</view>
	<lc-tabbar />
</template>

<script setup>
	import { ref, onMounted } from "vue"
	import { useTabStore } from '@/stores/tabStore';
	
	const tabStore = useTabStore();
	
	const handleClick = ()=>{
		uni.navigateTo({
			url:'/pages/info/index'
		})
	}
	
	onMounted(()=>{
		tabStore.initActive();
	})
</script>

<style>
	       
</style>
