<template>
	<div>
		<!--share button-->
		<div align="center" v-if="this.list.permissions == 'public'">
			<button class="copy-clipboard" @click.prevent="copyClipboard()">
				{{ this.beforeDisplay }}
			</button>
		</div>
		<!--share button-->
		<!--header-->
		<header class="from-top">
			List:
			<!--show if edit is not clicked-->
			<span v-if="!editListTitle"
				>{{ this.list.title }}
				<span
					v-if="isCreator"
					class="material-icons edit"
					@click.prevent="editTitle()"
					>edit</span
				></span
			>
			<!--show if edit is not clicked-->

			<!--show if edit is clicked-->
			<span v-if="editListTitle"
				><input id="listtitle" v-model.trim="newListTitle" />
				<span class="material-icons edit" @click.prevent="saveTitle()"
					>done</span
				></span
			>
			<!--show if edit is clicked-->

			<!--show to confirm an edit before saving it-->
			<p v-show="isVisable" class="alert-message">
				<b>Are you sure you want to change the list title?</b>
				<button @click="confirmTitleChange()">Yes</button>
				<button @click.prevent="cancelChanges()">No</button>
			</p>
			<!--show to confirm an edit before saving it-->
		</header>
		<!--header-->

		<!--list information-->
		<div class="list-info">
			<!--list creator-->
			<span>List creator: {{ this.list.user }}</span>
			<!--list creator-->

			<!--show when edit is not clicked-->
			<span v-if="!editListPermissions"
				>Permissions: {{ this.list.permissions }}
				<span
					v-if="isCreator"
					class="material-icons edit"
					@click.prevent="editPermissions()"
					>edit</span
				></span
			>
			<!--show when edit is not clicked-->

			<!--show if permissions edit is clicked-->
			<span v-if="editListPermissions"
				>Permissions:
				<select
					id="permissions"
					name="permissions"
					v-model="newListPermissions"
				>
					<option value="private">Private</option>
					<option value="public">Public</option>
				</select>
				<span class="material-icons edit" @click.prevent="savePermissions()"
					>done</span
				></span
			>
			<!--show if permissions edit is clicked-->

			<!--date list was created-->
			<span v-if="this.list.createdOn"
				>Created On: {{ formatDate(this.list.createdOn) }}</span
			>
			<!--date list was created-->
		</div>
		<!--list information-->

		<!--confirm permissions change before saving-->
		<p v-show="permissionsIsVisable" class="alert-message">
			<b>Are you sure you want to change the list permissions?</b>
			<button @click="confirmPermissionChange()">Yes</button>
			<button @click.prevent="cancelPermissionsChanges()">No</button>
		</p>
		<!--confirm permissions change before saving-->

		<div class="content">
			<!--show if creator-->
			<div class="todo-add" v-if="isCreator">
				<!--form to add tasks-->
				<div>
					<input
						class="todo-forms"
						v-model="title"
						type="text"
						placeholder="Title"
					/>
				</div>
				<div>
					<input
						class="todo-forms"
						v-model="description"
						type="text"
						placeholder="Description"
					/>
				</div>
				<div>
					<button @click.prevent="addItem" :disabled="!title">Add</button>
				</div>
				<!--form to add tasks-->
			</div>
			<!--show if creator-->

			<!--task list-->
			<div class="todo-items" v-for="(item, index) in task" :key="item._id">
				<div v-if="item.status == 'true'">
					<div class="todo-container todo-complete">
						<div class="no-display">
							<span class="number">{{ index + 1 }}</span>
						</div>
						<div>
							<input
								class="todo-forms"
								v-if="isSelected(item)"
								v-model="editedTitle"
							/>
							<p v-else class="text-p todo-title">
								<s>{{ item.title }}</s>
							</p>
						</div>
						<div>
							<input
								class="todo-forms"
								v-if="isSelected(item)"
								v-model="editedDescription"
							/>
							<p v-else class="text-p todo-description">
								<s>{{ item.description }}</s>
							</p>
						</div>

						<div>
							<span
								v-if="isCreator"
								class="icon has-text-primary"
								@click="isSelected(item) ? unselect() : select(item)"
							>
								<i class="material-icons">{{
									isSelected(item) ? 'close' : 'edit'
								}}</i>
							</span>
							<span
								v-if="isCreator"
								class="icon has-text-info"
								@click="isSelected(item) ? updateItem(item) : removeItem(item)"
							>
								<i class="material-icons">{{
									isSelected(item) ? 'save' : 'delete'
								}}</i>
							</span>
							<span v-if="isCreator" class="icon" @click="returnStatus(item)">
								<i class="material-icons">undo</i>
							</span>
						</div>
					</div>
				</div>
				<div v-else>
					<div class="todo-container">
						<div class="no-display">
							<span class="number">{{ index + 1 }}</span>
						</div>
						<div>
							<input
								class="todo-forms"
								v-if="isSelected(item)"
								v-model="editedTitle"
							/>
							<p v-else class="text-p todo-title">
								{{ item.title }}
							</p>
						</div>
						<div>
							<input
								class="todo-forms"
								v-if="isSelected(item)"
								v-model="editedDescription"
							/>
							<p v-else class="text-p todo-description">
								{{ item.description }}
							</p>
						</div>

						<div>
							<span
								v-if="isCreator"
								class="icon has-text-primary"
								@click="isSelected(item) ? unselect() : select(item)"
							>
								<i class="material-icons">{{
									isSelected(item) ? 'close' : 'edit'
								}}</i>
							</span>
							<span
								v-if="isCreator"
								class="icon has-text-info"
								@click="isSelected(item) ? updateItem(item) : removeItem(item)"
							>
								<i class="material-icons">{{
									isSelected(item) ? 'save' : 'delete'
								}}</i>
							</span>
							<span v-if="isCreator" class="icon" @click="changeStatus(item)">
								<i class="material-icons">done</i>
							</span>
						</div>
					</div>
				</div>
			</div>
			<!--task list-->

			<!--delete list button-->
			<div class="delete-list" v-if="isCreator">
				<button @click.prevent="deleteConfirm">Delete List</button>
			</div>
			<!--delete list button-->

			<!--alert to confirm deletion of list before deleting it-->
			<p v-show="deleteIsVisable" class="alert-message">
				<b>Are you sure you want to delete this list?</b>
				<button @click="confirmListDeletion()">Yes</button>
				<button @click.prevent="cancelDeleteList()">No</button>
			</p>
			<!--alert to confirm deletion of list before deleting it-->
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		props: {
			// check if the  creator is viewing the list page
			isCreator: {
				type: Boolean,
				required: false,
				default: false,
			},
		},
		data() {
			//all data needed for list component
			return {
				fullPath: window.location.href,
				beforeDisplay: 'Click to copy list URL to clipboard',
				listId: this.$route.params.id,
				username: this.$store.getters.username,
				userId: this.$store.getters.userId,
				list: [],
				task: [],
				user: [],
				title: '',
				editedTitle: '',
				description: '',
				editedDescription: '',
				status: '',
				editedTaskStatus: 'true',
				originalTaskStatus: 'false',
				selected: {},
				editListTitle: false,
				newListTitle: '',
				editListPermissions: false,
				newListPermissions: '',
				isVisable: false,
				permissionsIsVisable: false,
				deleteIsVisable: false,
			};
		},
		// load list info
		async created() {
			const response = await axios.get('/api/list/' + this.listId);
			this.list = response.data.list;
		},

		// load task info
		async mounted() {
			const taskList = await axios.get('/api/task/list/' + this.listId);
			this.task = taskList.data.task;
		},
		methods: {
			copyClipboard() {
				const clipboard = this.fullPath;
				navigator.clipboard.writeText(clipboard);
				this.beforeDisplay = 'Copied to clipboard';
			},
			// task related methods
			async addItem() {
				const response = await axios.post('/api/task/create', {
					title: this.title,
					description: this.description,
					list: this.listId,
					user: this.username,
					userId: this.userId,
				});
				this.task.push(response.data.task);
				this.title = '';
				this.description = '';
			},
			async changeStatus(item, index) {
				await axios.put('/api/task/' + item._id, {
					status: this.editedTaskStatus,
				});
				this.$router.go();
			},
			async returnStatus(item, i) {
				await axios.put('/api/task/' + item._id, {
					status: this.originalTaskStatus,
				});
				this.$router.go();
			},
			async removeItem(item) {
				await axios.delete('/api/task/' + item._id);
				this.$router.go();
			},
			select(item) {
				this.selected = item;
				this.editedDescription = item.description;
				this.editedTitle = item.title;
			},
			isSelected(item) {
				return item._id === this.selected._id;
			},
			unselect() {
				this.selected = {};
				this.editedDescription = '';
				this.editedTitle = '';
			},
			async updateItem(item, i) {
				const response = await axios.put('/api/task/' + item._id, {
					description: this.editedDescription,
					title: this.editedTitle,
				});
				this.$router.go();
			},

			// title change methods
			editTitle() {
				this.editListTitle = true;
			},
			saveTitle() {
				this.isVisable = true;
			},
			async confirmTitleChange() {
				await axios.patch('/api/list/' + this.listId, {
					title: this.newListTitle,
				});
				this.isVisable = false;
				this.editListTitle = false;
				this.list.title = this.newListTitle;
			},
			cancelChanges() {
				this.editListTitle = false;
				this.isVisable = false;
			},

			// permissions change methods
			editPermissions() {
				this.editListPermissions = true;
			},
			savePermissions() {
				this.permissionsIsVisable = true;
			},
			cancelPermissionsChanges() {
				this.editListPermissions = false;
				this.permissionsIsVisable = false;
			},
			async confirmPermissionChange() {
				await axios.patch('/api/list/' + this.listId, {
					permissions: this.newListPermissions,
				});
				this.permissionsIsVisable = false;
				this.editListPermissions = false;
				this.list.permissions = this.newListPermissions;
			},

			//delete list methods
			deleteConfirm() {
				this.deleteIsVisable = true;
			},
			cancelDeleteList() {
				this.deleteIsVisable = false;
			},
			async confirmListDeletion() {
				await axios.delete('/api/list/' + this.listId);
				await axios.delete('/api/task/list/' + this.listId);
				this.$router.push('/dashboard');
			},
		},
		isComplete() {
			return this.description != '';
		},
	};
</script>

<style scoped>
	header {
		margin: 10px 0;
	}
	header input {
		width: auto;
		padding: 10px;
		background-color: var(--darker-color);
		border: 2px solid var(--todo-container);
		color: var(--white);
		position: relative;
		top: -10px;
	}
	header p {
		font-size: 1rem;
		margin: 10px 0;
	}
	.content {
		width: 100%;
	}
	input {
		margin: 0px 5px;
		width: 92%;
	}
	button {
		padding: 10px 10px;
	}

	.edit {
		background-color: var(--darker-color);
		padding: 10px;
		border-radius: 20px;
		cursor: pointer;
	}

	.list-info .edit {
		background-color: var(--todo-primary);
		padding: 5px;
		border-radius: 20px;
		cursor: pointer;
		font-size: 0.8rem;
	}

	.list-info select,
	.list-info option {
		width: auto;
		padding: 3px;
		background-color: var(--todo-primary);
		border: 2px solid var(--todo-container);
		position: relative;
	}

	.list-info option:active {
		color: var(--white);
	}

	select > option {
		background-color: var(--darker-color);
	}

	.delete-list {
		text-align: center;
		margin: 10px 0;
	}

	.delete-list button {
		background-color: var(--todo-primary);
		border: 2px solid;
		border-color: var(--todo-primary);
		color: var(--white);
		border-radius: 20px;
		cursor: pointer;
	}

	.delete-list button:hover {
		background-color: var(--todo-secondary);
		border-color: var(--todo-secondary);
		color: var(--white);
	}

	.copy-clipboard {
		cursor: pointer;
		background-color: var(--todo-container);
		border: 0px;
		color: rgba(255, 255, 255, 0.6);
		margin: 20px 0 0 0;
	}
</style>
