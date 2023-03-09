const { body } = require("express-validator");

exports.registerSchema = [
  body("email").isEmail().withMessage("You must provide a valid email address"),
  body("password")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage(
      "You must provide a password that is at least 8 characters long"
    ),
];

exports.loginSchema = [
  body("email").isEmail().withMessage("You must provide a valid email adress"),
  body("password").not().isEmpty().withMessage("You must provide a password"),
];


exports.companySchema = [
<<<<<<< HEAD
  body("name")
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage("You must provide a company name"),
];
=======
	body('name')
	  .not()
	  .isEmpty()
	  .isLength({min:5})
	  .withMessage('You must provide a company name'),
	body('name')
		.not()
		.isEmpty()
		.withMessage('You must provide a company name'),
	body('adress')
		.not()
		.isEmpty()
		.withMessage('You must provide a adress name'),
	body('city')
		.not()
		.isEmpty()
		.withMessage('You must provide a city for the company'),
	
  ]

>>>>>>> b7e8d4ed1930079d3f2cfee24b9bbe8c9da57d8c
