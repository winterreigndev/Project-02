export default {
	// username of user logged in
	username(state) {
		return state.username;
	},
	// id of user logged in
	userId(state) {
		return state.userId;
	},
	// store role of user
	role(state) {
		return state.role;
	},
	// jwt token of user logged in
	token(state) {
		return state.token;
	},
	// if the user is authenticated
	isAuthenticated(state) {
		return !!state.token;
	},
};
