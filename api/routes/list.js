// imports
const express = require('express');
const router = express.Router();

// controllers
const ListController = require('../controllers/list');

// router paths
// -- create list
router.post('/create', ListController.list_create);

// -- get all lists
router.get('/all', ListController.list_all);

// -- get lists by username
router.get('/user/:username', ListController.list_users);

// -- get lists by ID
router.get('/:id', ListController.list_ID);

// -- edit list by ID
router.patch('/:listId', ListController.list_edit);

// -- delete list by ID
router.delete('/:id', ListController.list_id_delete);

// -- delete lists by user
router.delete('/remove/:user', ListController.list_delete);

// export router
module.exports = router;
