export default {
	nuxtServerInit({ commit }, { req, app }) {
		const token = app.$cookies.get('token');
		const username = app.$cookies.get('username');
		const userId = app.$cookies.get('userId');
		const role = app.$cookies.get('role');
		// store token and userid in the store
		const payload = {
			token,
			username,
			userId,
			role,
		};
		commit('setUser', payload);
	},
};
