<template>
	<div>
		<div class="content">
			<!--user's profile title-->
			<h3>{{ this.$route.params.username }}'s public lists</h3>
			<!--user's profile title-->

			<!--list only public lists by user-->
			<div class="dashboard-lists-heading">
				<div class="list-top">ID</div>
				<div class="list-top">List Name Here</div>
				<div class="list-top">Created On</div>
				<div class="list-top">Permissions</div>
			</div>
			<div v-for="list in lists" :key="list._id">
				<ul class="dashboard-lists" v-if="list.permissions == 'public'">
					<li class="hint--bottom hint--info" :aria-label="list._id">
						<span class="material-icons the-id">label</span>
						<span class="id-text"><b>#ID</b></span>
					</li>
					<li>
						<NuxtLink :to="'/list/' + list._id">{{ list.title }}</NuxtLink>
					</li>
					<li>{{ formatDate(list.createdOn) }}</li>
					<li>{{ list.permissions }}</li>
				</ul>
			</div>
			<!--list only public lists by user-->
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		// data for page
		data() {
			return {
				lists: [],
			};
		},

		// get list information
		async created() {
			const response = await axios.get(
				'/api/list/user/' + this.$route.params.username
			);
			this.lists = response.data.lists;
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
