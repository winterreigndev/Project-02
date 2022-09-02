<template>
	<div>
		<div class="site">
			<div class="title"><span>To-Do</span> List</div>
			<div class="navigation">
				<Navigation />
			</div>
		</div>
		<div class="main-content"><Nuxt /></div>
	</div>
</template>

<style scoped>
	.navigation {
		background-color: transparent !important;
		text-align: right;
	}
</style>
