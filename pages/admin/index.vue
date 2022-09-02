<template>
	<div>
		<!--all lists on site-->
		<div class="dashboard-lists-heading">
			<div class="list-top">ID</div>
			<div class="list-top">List Name Here</div>
			<div class="list-top">Additional Info</div>
			<div class="list-top">User</div>
			<div class="list-top">Delete</div>
		</div>
		<div v-for="list in lists" :key="list._id">
			<ul class="dashboard-lists">
				<!--list ID-->
				<li class="hint--bottom hint--info" :aria-label="list._id">
					<span class="material-icons the-id">label</span>
					<span class="id-text"><b>#ID</b></span>
				</li>
				<!--list ID-->

				<!--list title-->
				<li>
					{{ list.title }}
				</li>
				<!--list title-->

				<!--additional info-->
				<li class="additional-info">
					<!--created on-->
					<div
						class="hint--bottom hint--info material-icons the-id"
						:aria-label="formatDate(list.createdOn)"
					>
						calendar_today
					</div>
					<!--created on-->

					<!--permissions-->
					<div
						v-if="list.permissions == 'public'"
						class="material-icons the-id hint--bottom hint--info"
						:aria-label="list.permissions"
					>
						public
					</div>

					<div
						v-if="list.permissions == 'private'"
						class="material-icons the-id hint--bottom hint--info"
						:aria-label="list.permissions"
					>
						public_off
					</div>
					<!--permissions-->
				</li>
				<!--additional info-->

				<!--user-->
				<li>{{ list.user }}</li>
				<!--user-->

				<!--delete list-->
				<li>
					<span @click.prevent="deleteList(list)" class="material-icons the-id"
						>delete</span
					>
				</li>
				<!--delete list-->
			</ul>
		</div>
		<!--all lists on site-->
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		// all data for page
		data() {
			return {
				lists: [],
				removeList: 'Delete List',
			};
		},
		// list informaton
		async created() {
			const listReponse = await axios.get('/api/list/all/');
			this.lists = listReponse.data.lists;
		},
		methods: {
			// delete list
			async deleteList(list) {
				axios.delete('/api/list/' + list._id);
				this.$router.go();
			},
		},
	};
</script>

<style scoped>
	.dashboard-lists-heading,
	.dashboard-lists {
		display: grid;
		grid-template-columns: 10% 40% 20% 20% 10%;
		text-align: center;
		margin: 5px 0;
	}

	.additional-info {
		display: grid;
		grid-template-columns: 50% 50%;
		text-align: center;
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
