const express = require('express')
const router = express.Router()

const { getAllUsers, getUserById, deleteUserById } = require('../controller/userControllers')

router.get('/', getAllUsers)
router.get('/:userId', getUserById)
router.delete('/:userId', deleteUserById)


module.exports = router
