// imports
const express = require('express');
const router = express.Router();

// controllers
const UserController = require('../controllers/user');

// router paths
// -- register user
router.post('/register', UserController.user_register);

// -- login user
router.post('/login', UserController.user_login);

// -- get all users
router.get('/all', UserController.user_list);

//-- user information
router.get('/:username', UserController.user_information);

// -- update user information
router.patch('/:userId', UserController.user_update);

// -- delete user
router.delete('/:userId', UserController.user_delete);

// export router
module.exports = router;
