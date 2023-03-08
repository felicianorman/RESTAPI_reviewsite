const { body } = require('express-validator')

exports.registerSchema = [
	body('email').isEmail().withMessage('You must provide a valid email address'),
	body('password')
		.not()
		.isEmpty()
		.isLength({ min: 6 })
		.withMessage('You must provide a password that is at least 8 characters long'),
]

exports.loginSchema = [
	body("username").not().isEmpty().withMessage("You must provide a username"),
	body("password").not().isEmpty().withMessage("You must provide a password"),
  ];

exports.companySchema = [
	body('name')
	  .not()
	  .isEmpty()
	  .withMessage('You must provide a company name'),
  ];

<<<<<<< HEAD
=======
//validering för update, behövs inte not empty
//validering för skapa
//validering för delete vem som har tillgång att radera
>>>>>>> c3a2c77a982361d4eced9f7319b4b02928949685
