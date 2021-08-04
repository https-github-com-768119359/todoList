<template>
	<view>
	    <uni-calendar 
	    :insert="true"
	    :lunar="true" 
	    :start-date="'2021-6-1'"
	    :end-date="'2023-6-1'"
	    @change="change"
	     ></uni-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			change(date){
				console.log(date)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
