class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

class BadRequestError extends Error {
  constructor(message = 'Bad request') {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

module.exports = {
  NotFoundError,
  ForbiddenError,
  BadRequestError
};
