class UnauthError extends Error {
  constructor(message = 'Необходима авторизация') {
    super(message);
    this.name = 'UnauthError';
    this.statusCode = 401;
  }
}

module.exports = UnauthError;
