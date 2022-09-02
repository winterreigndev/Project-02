<template>
	<div>
		<!--only show if role for logged in user is admin-->
		<div v-if="isAuthenticated && this.user.role == 'admin'">
			<div class="dashboard">
				<div class="sidebar">
					<div class="sidbar-welcome">Welcome, {{ this.user.username }}!</div>
					<div class="dashboard-icon">
						<span class="material-icons"> account_circle </span>
					</div>
					<div class="user-info">Site Information</div>
					<ul>
						<!--total of lists on site-->
						<li><b>Total Site Lists:</b> {{ this.listNumber }}</li>
						<!--total of lists on site-->

						<!--total of  users on site-->
						<li><b>Total Site Users:</b> {{ this.usersNumber }}</li>
						<!--total of  users on site-->
					</ul>
					<div align="center">
						<!--navigation for admin -- view all lists-->
						<button @click.prevent="viewLists()">View All Lists</button>
						<!--navigation for admin -- view all lists-->

						<!--navigation for admin -- view all users-->
						<button class="delete" @click.prevent="viewUsers()">
							View All Users
						</button>
						<!--navigation for admin -- view all users-->
					</div>
				</div>
				<div class="dashboard-content">
					<!--admin child pages -- all lists, all users -->
					<NuxtChild />
				</div>
			</div>
		</div>
		<!--only show if role for logged in user is admin-->
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		// data for page
		data() {
			return {
				user: [],
				lists: [],
				currentUser: this.$store.getters.username,
				listNumber: null,
				usersNumber: null,
			};
		},
		// load current user, users number, lists number and list information
		async created() {
			const response = await axios.get('/api/user/' + this.currentUser);
			this.user = response.data.user;

			const responseUser = await axios.get('/api/user/all/');
			this.usersNumber = responseUser.data.count;

			const listCount = await axios.get('/api/list/all/');
			this.lists = listCount.data.lists;
			this.listNumber = listCount.data.count;
		},
		methods: {
			// view lists route
			viewLists() {
				this.$router.push('/admin/');
			},
			// view users route
			viewUsers() {
				this.$router.push('/admin/users');
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
