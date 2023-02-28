const express = require('express')
// const { userRoles } = require('../constants/users')
const router = express.Router()
const { getAllCompanies } = require('../controller/companyController')
// const { isAuthenticated, authorizeRoles } = require('../middleware/authenticationMiddleware')

// router.get('/', isAuthenticated, authorizeRoles(userRoles.ADMIN), getAllUsers)
router.get('/', getAllCompanies)
// router.get('/:userId', isAuthenticated, getUserById)
// router.delete('/:userId', isAuthenticated, deleteUserById)

module.exports = router
