<template>
	<div>
		<!--login page-->
		<div class="container">
			<h3>Login</h3>
			<div class="form-wrapper">
				<form @submit.prevent="loginUser">
					<div>
						<label for="username"> Username: </label>
						<input type="text" id="username" v-model.trim="username" />
					</div>
					<div>
						<label for="password"> Password: </label>
						<input type="password" id="password" v-model.trim="password" />
					</div>
					<!--show an error if there is one-->
					<p class="error" v-if="this.errorStatus">{{ this.errorStatus }}</p>
					<!--show an error if there is one-->
					<button>Login</button>
				</form>
			</div>
		</div>
		<!--login page-->
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		// page name
		name: 'login',

		// data for page
		data() {
			return {
				username: '',
				password: '',
				errorStatus: '',
				error: false,
			};
		},
		methods: {
			// login method that stores response data in local storage and cookies and stores info in vuex store
			async loginUser() {
				await axios
					.post('/api/user/login', {
						username: this.username,
						password: this.password,
					})
					.then((response) => {
						const responseData = response.data;
						const expiresIn = +responseData.expiresIn * 5000;
						const expirationDate = new Date().getTime() + expiresIn;
						this.$cookies.set('token', responseData.token);
						this.$cookies.set('username', responseData.username);
						this.$cookies.set('userId', responseData.userId);
						this.$cookies.set('role', responseData.role);
						this.$cookies.set('tokenExpiration', expirationDate);
						this.$store.commit('setUser', {
							token: responseData.token,
							username: responseData.username,
							userId: responseData.userId,
							role: responseData.role,
						});
						this.username = responseData.username;
						if (response.status == 200) {
							this.$router.push('/users/' + this.username);
						}
					})
					.catch((err) => {
						console.log('error', err);
						this.errorStatus = err.response.data.message;
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
