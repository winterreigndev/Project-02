<template>
	<div>
		<!--for creator && is auth-->
		<div v-if="this.user === this.theList.user && isAuthenticated">
			<List isCreator />
		</div>
		<!--for creator && is auth-->

		<!--for viewer && is public-->
		<div
			v-if="
				this.theList.permissions === 'public' &&
				this.user != this.theList.user &&
				!isAuthenticated
			"
		>
			<List />
		</div>
		<!--for viewer && is public-->

		<!--for viewer && is private-->
		<div
			v-if="
				this.theList.permissions === 'private' &&
				this.user !== this.theList.user &&
				!isAuthenticated
			"
		>
			<h4>We're sorry, this list is set to private by the creator.</h4>
		</div>
		<!--for viewer && is private-->
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		// data for this page
		data() {
			return {
				user: this.$store.getters.username,
				theList: [],
				listId: this.$route.params.id,
			};
		},
		// list information
		async created() {
			const response = await axios.get('/api/list/' + this.listId);
			this.theList = response.data.list;
		},
	};
</script>
