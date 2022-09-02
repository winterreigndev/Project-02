export default {
	setUser(state, payload) {
		state.token = payload.token;
		state.username = payload.username;
		state.userId = payload.userId;
		state.role = payload.role;
	},
};
