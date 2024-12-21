<template>
	<view>详情详情详情</view>
</template>

<script setup>
	import { ref, onMounted } from "vue"
	import { useTabStore } from '@/stores/tabStore';
	
	const tabStore = useTabStore();
	
	onMounted(()=>{
		tabStore.initActive();
	})
</script>

<style>
	       
</style>
