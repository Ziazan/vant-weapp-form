<!--
 * @Date: 2019-04-01 01:47:12
 * @LastEditTime: 2024-12-04 21:40:50
 * @Description: 请填写简介
-->
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.hideTabBar() //marker: 需要隐藏tabbar
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
