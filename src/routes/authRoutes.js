const express = require("express");
const router = express.Router();
const { validate } = require('../middleware/validation/validationMiddleware');
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const { registerSchema, loginSchema } = require('../middleware/validation/validationSchemas')

const { register, login  } = require('../controller/authControllers')

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)

module.exports = router;