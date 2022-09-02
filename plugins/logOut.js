import Vue from 'vue';
Vue.mixin({
	methods: {
		// logout and remove all cookies and local storage items from their browser
		logout() {
			localStorage.removeItem('token');
			localStorage.removeItem('username');
			localStorage.removeItem('role');
			localStorage.removeItem('tokenExpiration');
			this.$cookies.remove('token');
			this.$cookies.remove('username');
			this.$cookies.remove('role');
			this.$cookies.remove('tokenExpiration');
			this.$router.go();
		},
	},
});
