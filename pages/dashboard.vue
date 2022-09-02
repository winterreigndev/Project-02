<template>
	<div>
		<!--user dashboard-->
		<div v-if="isAuthenticated">
			<div class="dashboard">
				<!--sidebar-->
				<div class="sidebar">
					<!--welcome the user-->
					<div class="sidbar-welcome">Welcome, {{ this.user.username }}!</div>
					<!--welcome the user-->
					<div class="dashboard-icon">
						<span class="material-icons"> account_circle </span>
					</div>
					<div class="user-info">User Information</div>
					<ul>
						<!--user's current active lists-->
						<li><b>Active Lists:</b> {{ this.listNumber }}</li>
						<!--user's current active lists-->

						<!--user's email address for the account-->
						<li class="user-info-email"><b>Email:</b> {{ this.user.email }}</li>
						<!--user's email address for the account-->

						<!--user's unique id-->
						<li class="user-info-id"><b>User ID:</b> {{ this.user._id }}</li>
						<!--user's unique id-->
					</ul>
					<div align="center">
						<!--user sub navigation-->
						<button @click.prevent="changeEmail()">Change Email</button>
						<button class="delete" @click.prevent="deleteAccount()">
							Delete Account
						</button>
						<!--user sub navigation-->
					</div>
				</div>
				<!--sidebar-->

				<!--nuxt child thhat holds user lists, email change and delete account-->
				<div class="dashboard-content">
					<NuxtChild />
				</div>
				<!--nuxt child thhat holds user lists, email change and delete account-->
			</div>
		</div>

		<!--what users who are not signed in see-->
		<div v-else>
			You do not have permissions to view this page. Please
			<NuxtLink to="/login">login</NuxtLink>.
		</div>
		<!--what users who are not signed in see-->

		<!--user dashboard-->
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		// data for the page
		data() {
			return {
				user: [],
				currentUser: this.$store.getters.username,
				listNumber: null,
			};
		},
		// user info and number of lists created
		async created() {
			const response = await axios.get('/api/user/' + this.currentUser);
			this.user = response.data.user;

			const listCount = await axios.get('/api/list/user/' + this.currentUser);
			this.listNumber = listCount.data.count;
		},
		methods: {
			// route to change email address for the account
			changeEmail() {
				this.$router.push('/dashboard/email/');
			},
			// route to delete the account
			deleteAccount() {
				this.$router.push('/dashboard/delete/');
			},
		},
	};
</script>

<style scoped>
	.user-info-email,
	.user-info-id {
		word-break: break-all;
	}
</style>
