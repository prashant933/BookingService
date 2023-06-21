const { StatusCodes } = require("http-status-codes");

class ValidationError extends Error {
  constructor(error) {
    super();
    let description = [];
    error.errors.forEach((err) => {
      description.push(err);
    });
    this.name = "Validation Error";
    this.message = "Not able to validate the data sent in the request";
    this.description = description;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = ValidationError;
