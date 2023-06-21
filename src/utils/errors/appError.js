class AppError extends Error {
  constructor(name, description, message, statusCode) {
    super();
    this.name = name;
    this.description = description;
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
