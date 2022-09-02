<template>
	<div>
		<!--list of all users on site-->
		<div class="dashboard-lists-heading">
			<div class="list-top">ID</div>
			<div class="list-top">Username</div>
			<div class="list-top">Email</div>
			<div class="list-top">Delete</div>
		</div>
		<div v-for="user in users" :key="user._id">
			<ul class="dashboard-lists">
				<!--user id-->
				<li class="hint--bottom hint--info" :aria-label="user._id">
					<span class="material-icons the-id">label</span>
					<span class="id-text"><b>#ID</b></span>
				</li>
				<!--user id-->

				<!--user username-->
				<li>
					{{ user.username }}
				</li>
				<!--user username-->

				<!--user email-->
				<li>{{ user.email }}</li>
				<!--user email-->

				<!--delete user-->
				<li>
					<span @click.prevent="deleteUser(user)" class="material-icons the-id"
						>delete</span
					>
				</li>
				<!--delete user-->
			</ul>
		</div>
		<!--list of all users on site-->
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		// information for page
		data() {
			return {
				users: [],
				removeList: 'Delete List',
			};
		},
		// all user data
		async created() {
			const listReponse = await axios.get('/api/user/all/');
			this.users = listReponse.data.users;
		},
		methods: {
			// delete user method
			async deleteUser(user) {
				axios.delete('/api/user/' + user._id);
				this.$router.go();
			},
		},
	};
</script>

<style scoped>
	.dashboard-lists-heading,
	.dashboard-lists {
		display: grid;
		grid-template-columns: 10% 40% 40% 10%;
		text-align: center;
		margin: 5px 0;
	}

	.the-id {
		cursor: pointer;
		color: var(--todo-primary);
	}
	.id-text {
		position: relative;
		top: -5px;
		color: var(--todo-primary);
	}
</style>
