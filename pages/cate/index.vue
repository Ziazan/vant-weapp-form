<!--
 * @Date: 2024-12-04 21:25:15
 * @LastEditTime: 2024-12-04 21:32:10
 * @Description: 请填写简介
-->
<template>
	<lc-sub-tab/>
	<view>Cate</view>
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


	