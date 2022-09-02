<template>
	<div>
		<div class="homepage">
			<div class="navigation">
				<Navigation />
			</div>
		</div>
		<header>
			<div class="from-top"><span>To-Do</span> List</div>
			<span class="description"
				>a simple site for users to create their own to-do lists</span
			>
		</header>

		<Nuxt />
	</div>
</template>

<style scoped>
	.navigation {
		padding: 30px 10px;
	}
</style>
