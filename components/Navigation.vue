<template>
	<div>
		<NuxtLink to="/" v-if="!isAuthenticated">Homepage</NuxtLink>
		<NuxtLink to="/register" v-if="!isAuthenticated">Register</NuxtLink>
		<NuxtLink to="/login" v-if="!isAuthenticated">Login</NuxtLink>
		<!--only show if logged in-->
		<NuxtLink to="/dashboard" v-if="isAuthenticated">Dashboard</NuxtLink>
		<!--only show if logged in-->

		<!--only show if logged in-->
		<NuxtLink
			:to="'/users/' + this.$store.getters.username"
			v-if="isAuthenticated"
			>Profile</NuxtLink
		>
		<!--only show if logged in-->

		<!--only show if logged in user role is admin-->
		<NuxtLink to="/admin" v-if="this.$store.getters.role == 'admin'"
			>Admin</NuxtLink
		>
		<!--only show if logged in user role is admin-->

		<!--only show if logged in-->
		<NuxtLink to="" @click.native="logout()" v-if="isAuthenticated"
			>Logout</NuxtLink
		>
		<!--only show if logged in-->
	</div>
</template>
