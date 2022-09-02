<template>
	<div>
		<h3>Create List</h3>
		<!--form to create list-->
		<form @submit.prevent="createList">
			<div class="create-wrapper">
				<div>
					<label for="title">Title of List:</label>
				</div>
				<div><input id="title" v-model.trim="title" /></div>
			</div>
			<div class="create-wrapper">
				<div>
					<label for="permissions"
						>Private or Public? (<small>you can change this later</small
						>):</label
					>
				</div>
				<div>
					<select id="permissions" name="permissions" v-model="permissions">
						<option value="private">Private</option>
						<option value="public">Public</option>
					</select>
				</div>
			</div>
			<button>Create List</button>
		</form>
		<!--form to create list-->

		<!--faq for users in case they have questions immediately-->
		<h4>FAQ (frequently asked questions)</h4>
		<div class="create-info">
			<div>
				<b>Where can I add items to my list?</b> You can add and remove tasks
				when viewing your list.
			</div>
			<div>
				<b>What is private or public?</b> You can choose if you want anyone to
				be able to see your list.
			</div>
			<div>
				<b>Will anyone I share my list with be able to edit it?</b> Don't worry!
				No one you share the link with can edit your list, only you have that
				privilege.
			</div>
			<div>
				<b>Can I change my list title or private setting after I create it?</b>
				Yes, you can do that by clicking the edit button on your list or in your
				dashboard.
			</div>
		</div>
		<!--faq for users in case they have questions immediately-->
	</div>
</template>

<script>
	import axios from 'axios';
	// data for page
	export default {
		data() {
			return {
				title: '',
				permissions: '',
				user: this.$store.getters.username,
				createdOn: new Date().toLocaleDateString('en-US'),
			};
		},

		methods: {
			// create list method
			async createList() {
				await axios
					//register user with information entered
					.post('/api/list/create', {
						title: this.title,
						permissions: this.permissions,
						createdOn: this.createdOn,
						user: this.user,
					})
					// get the response from the server
					.then((response) => {
						this.results = response.data.results;
						// if registered successfully, push to login page with success message
						if (response.status == 201) {
							this.$router.push({ name: 'dashboard', params: { id: 1 } });
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
	button {
		width: 30%;
	}
</style>
