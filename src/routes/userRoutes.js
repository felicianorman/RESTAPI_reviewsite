const express = require('express')
const router = express.Router()
const { isAuthenticated, authorizeRoles} = require("../middleware/authenticationMiddleware");
const { getAllUsers, getUserById, deleteUserById } = require('../controller/userControllers');
const { userRoles } = require('../constants/users');

router.get('/', isAuthenticated, authorizeRoles(userRoles.ADMIN) ,getAllUsers)
router.get('/:userId', getUserById)
router.delete('/:userId', isAuthenticated, authorizeRoles(userRoles.ADMIN, userRoles.USER) ,deleteUserById)


module.exports = router
