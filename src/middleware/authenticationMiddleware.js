const { UnauthenticatedError, UnauthorizedError } = require("../utils/errors");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
	let token;
	const authHeader = req.headers.authorization;

	if (authHeader && authHeader.startsWith("Bearer")) {
		token = authHeader.split(" ")[1];
	}

	if (!token) {
		throw new UnauthenticatedError("Authentication invalid");
	}

  
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      // @ts-ignore
      userId: payload.userId,
      // @ts-ignore
      role: payload.role,
      // @ts-ignore
      username: payload.username,
    };

    next();
  } catch (error) {
	console.log('..........................')
	return res.status(401).send('Authentication invalid')
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user?.role || !roles.includes(req.user.role)) {
        throw new UnauthorizedError("Unauthorized Access");
      }

      next();
    } catch (error) {
		return res.status(error.statusCode || 500).send(error.message)
	}
  };
};
