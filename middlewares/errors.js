const { SERVER_ERROR_CODE } = require('../constants');

class GeneralError extends Error {
  constructor(message = 'error') {
    super(message);
    this.name = 'GeneralError';
    this.statusCode = 400;
  }
}

class UnauthError extends Error {
  constructor(message = 'Необходима авторизация') {
    super(message);
    this.name = 'UnauthError';
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Действие запрещено') {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message = 'not found') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class DataConflictError extends Error {
  constructor(message = 'data conflict') {
    super(message);
    this.name = 'DataConflictError';
    this.statusCode = 409;
  }
}

const errorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = SERVER_ERROR_CODE, message } = err;
  next();
  return res
    .status(statusCode)
    .send({
    // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === SERVER_ERROR_CODE
        ? 'На сервере произошла ошибка'
        : message,
    });
};

module.exports = {
  GeneralError,
  UnauthError,
  ForbiddenError,
  NotFoundError,
  DataConflictError,
  errorHandler,
};
