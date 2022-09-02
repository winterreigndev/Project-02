// imports
const express = require('express');
const router = express.Router();

// controllers
const TaskController = require('../controllers/task');

// router paths
// -- create task
router.post('/create', TaskController.task_create);

// -- get all tasks
router.get('/tasks', TaskController.task_all);

// -- get task by list id
router.get('/list/:listId', TaskController.task_list);

// -- get task by task id
router.get('/:taskId', TaskController.task_taskId);

// -- get task by user id
router.get('/user/:userId', TaskController.task_user);

// -- update task by taskId
router.put('/:taskId', TaskController.task_update);

// -- delete task by taskId
router.delete('/:taskId', TaskController.task_delete);

// -- delete tasks by listId
router.delete('/list/:listId', TaskController.task_list_delete);

// -- delete tasks by userId
router.delete('/remove/:userId', TaskController.task_user_delete);

// export router
module.exports = router;
