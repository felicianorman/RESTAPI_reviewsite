const express = require("express");
const router = express.Router();

const { register } = require('../controller/authControllers')

router.post('/register', register)

module.exports = router;