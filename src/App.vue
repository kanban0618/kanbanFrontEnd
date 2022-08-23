<template>
	<div class="box-connertai">
		<router-view></router-view>
	</div>
</template>

<script>

import Login from './components/Login.vue'
import manager from './components/manager/manager.vue'

export default {
	name: 'App',
	components: {
		Login,
		manager
	}
}
</script>

<style lang="less" >
html,
body {
	width: 100%;
	height: 100%;
}

* {
	margin: 0;
	padding: 0;
}

.box-connertai {
	width: 100%;
	height: 100%;
}
</style>
