<template>
	<div>
		<!--register page-->
		<div class="container">
			<h3>Register New Account</h3>
			<div class="form-wrapper">
				<form @submit.prevent="registerAccount">
					<div>
						<label for="username"> Username: </label>
						<input type="text" id="username" v-model.trim="username" />
					</div>
					<div>
						<label for="email"> Email: </label>
						<input type="email" id="email" v-model.trim="email" />
					</div>

					<div>
						<label for="password"> Password: </label>
						<input type="password" id="password" v-model.trim="password" />
					</div>
					<!--show an error if there is one-->
					<p class="error" v-if="this.errorStatus">{{ this.errorStatus }}</p>
					<!--show an error if there is one-->
					<button>Register Account</button>
				</form>
			</div>
		</div>
		<!--register page-->
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		// data for page
		data() {
			return {
				email: '',
				username: '',
				password: '',
				errorStatus: '',
				role: 'user',
				error: false,
				date: new Date().toLocaleDateString('en-US'),
			};
		},
		methods: {
			// register account method that then sends user to the login page
			async registerAccount() {
				await axios
					//register user with information entered
					.post('/api/user/register', {
						email: this.email,
						username: this.username,
						password: this.password,
						role: this.role,
						date: this.date,
					})
					// get the response from the server
					.then((response) => {
						this.results = response.data.results;
						// if registered successfully, push to login page with success message
						if (response.status == 201) {
							this.$router.push({ name: 'login', params: { id: 1 } });
						}
					})
					// if there is an error, print it and assign the response to the error status data
					.catch((err) => {
						this.errorStatus =
							err.response.data.username || err.response.data.email;
					});
			},
		},
	};
</script>

<style scoped>
	div {
		padding: 10px 0;
	}

	form div {
		display: grid;
		grid-template-columns: 40% 60%;
	}

	.error {
		color: var(--todo-secondary);
		margin: 5px 0;
	}
</style>
