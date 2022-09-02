<template>
	<div>
		<!--show after successfully creating a new list-->
		<p v-if="this.$route.params.id === 1" v-show="elementVisible">
			<span class="message">New list created!</span>
		</p>
		<!--show after successfully creating a new list-->

		<!--create new list button-->
		<div class="create-new">
			<button @click="createList">Create New List</button>
		</div>
		<!--create new list button-->

		<!--show lists by user-->
		<div class="dashboard-lists-heading">
			<div class="list-top">ID</div>
			<div class="list-top">List Name Here</div>
			<div class="list-top">Created On</div>
			<div class="list-top">Permissions</div>
		</div>
		<div v-for="list in lists" :key="list._id">
			<ul class="dashboard-lists">
				<!--list id-->
				<li class="hint--bottom hint--info" :aria-label="list._id">
					<span class="material-icons the-id">label</span>
					<span class="id-text"><b>#ID</b></span>
				</li>
				<!--list id-->

				<!--list title-->
				<li>
					<NuxtLink :to="'/list/' + list._id">{{ list.title }}</NuxtLink>
				</li>
				<!--list title-->

				<!--list created on-->
				<li>{{ formatDate(list.createdOn) }}</li>
				<!--list created on-->

				<!--list permissions-->
				<li>{{ list.permissions }}</li>
				<!--list permissions-->
			</ul>
		</div>
		<!--show lists by user-->
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: 'dashboard',
		// data for page
		data() {
			return {
				elementVisible: 'true',
				lists: [],
				currentUser: this.$store.getters.username,
			};
		},
		methods: {
			// create list route
			createList() {
				this.$router.push('/list/create');
			},
		},
		async created() {
			// get list information for user
			const listAll = await axios.get('/api/list/user/' + this.currentUser);
			this.lists = listAll.data.lists;

			// set a timeout for the successful message after list creation
			setTimeout(() => (this.elementVisible = false), 4000);
		},
	};
</script>

<style scoped>
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
