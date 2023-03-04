class GeneralError extends Error {
  constructor(message = 'error') {
    super(message);
    this.name = 'GeneralError';
    this.statusCode = 400;
  }
}

module.exports = GeneralError;
