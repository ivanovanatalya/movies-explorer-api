const { SERVER_ERROR_CODE } = require('../utils/constants');

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

module.exports = errorHandler;
