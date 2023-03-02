const catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

class CustomAPIError extends Error {
  constructor(message) {
    //VILKET ÄR MEDDELANDET? HÄNGER DET IHOP MED CONTROLLERS ERROR? DERAS MESSAGE?
    super(message);
  }
}

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = "BadReqiestError"; //KAN MAN SKRIVA VAD SOM HELST HÄR?
  }
}

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = "UnauthenticatedError";
  }
}

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = "UnautorizedError";
  }
}

class ValidationError extends BadRequestError {
  constructor(message, validationErrors) {
    super(message);
    this.validationErrors = validationErrors;
  }
}

module.exports = {
  catchErrors, //VARFÖR ÄR DENNA GUL OCH DE ANDRA GRÖNA? :)
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  ValidationError,
};
