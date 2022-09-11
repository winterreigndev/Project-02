<template>
	<div>
		<h3>Delete Your Account</h3>
		<p>Please note that if you delete your account, it cannot be recovered.</p>
		<!--delete account button-->
		<form @submit.prevent="deleteAccount">
			<div><button>Delete Your Account</button></div>
		</form>
		<!--delete account button-->

		<!--confirm message before deleting account-->
		<p v-show="isVisable" class="alert-message">
			<b>Are you sure you want to delete your account?</b>
			<button @click="confirmDeleteAccount()">Yes</button>
			<button @click.prevent="cancelDelete()">No</button>
		</p>
		<!--confirm message before deleting account-->
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		// page data
		data() {
			return {
				confirm: '',
				isVisable: false,
				currentUser: this.$store.getters.username,
				currentUserId: this.$store.getters.userId,
			};
		},
		methods: {
			// delete confirm - change is visable to true to show it
			deleteAccount() {
				this.isVisable = true;
			},
			// delete account, tasks by account, lists by account, and remove localstorage/cookies
			async confirmDeleteAccount() {
				await axios.delete('/api/task/remove/' + this.currentUser);
				await axios.delete('/api/list/remove/' + this.currentUser);
				await axios.delete('/api/user/' + this.currentUserId);
				this.$cookies.remove('token');
				this.$cookies.remove('username');
				this.$cookies.remove('userId');
				this.$cookies.remove('role');
				this.$cookies.remove('tokenExpiration');
				this.$router.go('/');
			},
			// hide deletion confirm prompt
			cancelDelete() {
				this.$router.push({ name: 'dashboard' });
			},
		},
	};
</script>

<style scoped>
	form button {
		width: 40% !important;
		margin: 5px 0;
	}
</style>
