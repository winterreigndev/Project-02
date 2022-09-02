<template>
	<div>
		<h3>Change Email for Current Account</h3>
		<p>
			Please fill out the following with the email address you prefer to use for
			this account. The current email you have for this account is:
			<b>{{ this.currentEmail }}</b>
		</p>
		<!--form to change email-->
		<form @submit.prevent="changeEmail">
			<label for="email">New Email: </label>
			<input type="email" id="email" v-model.trim="newEmail" />
			<div><button>Submit Changes</button></div>
		</form>
		<!--form to change email-->

		<!--confirm email change before saving to database-->
		<p v-show="isVisable" class="alert-message">
			<b>Are you sure you want to change your email?</b>
			<button @click="confirmChangeEmail()">Yes</button>
			<button @click.prevent="cancelChanges()">No</button>
		</p>
		<!--confirm email change before saving to database-->
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		// data for page
		data() {
			return {
				currentEmail: '',
				newEmail: '',
				confirm: '',
				isVisable: false,
				currentUser: this.$store.getters.username,
				currentUserId: this.$store.getters.userId,
			};
		},
		// pull user email info
		async created() {
			const response = await axios.get('/api/user/' + this.currentUser);
			this.currentEmail = response.data.user.email;
		},
		methods: {
			// change email prompt to true
			changeEmail() {
				this.isVisable = true;
			},
			// confirm change of email and send to database
			confirmChangeEmail() {
				this.$axios
					.patch('/user/' + this.currentUserId, {
						email: this.newEmail,
					})
					.then((response) => {
						this.$router.go();
					})
					.catch((error) => {
						console.log(error);
					});
			},
			// hide change email confirm prompt
			cancelChanges() {
				this.isVisable = false;
				this.newEmail = '';
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
