<template>
	<div>
		<!--main landing page-->
		<div class="index-content">
			<!--why create an account?-->
			<h3><span>Why create an account?</span></h3>
			<ul class="index">
				<li>
					All user lists are not shown publicly on the main area of the site
				</li>
				<li>You have the option to share your list with anyone</li>
				<li>Create as many lists as you need</li>
				<li>Keep up with your to-dos all in one place</li>
			</ul>
			<!--why create an account?-->
		</div>

		<!--link to register-->
		<h4>
			<NuxtLink to="/register"
				><span>Ready to create lists? Register now!</span></NuxtLink
			>
		</h4>
		<!--link to register-->

		<!--main landing page-->
	</div>
</template>

<script>
	export default {
		// page nave and layout for the page
		name: 'home',
		// set layout of page
		layout: 'homepage',
	};
</script>
