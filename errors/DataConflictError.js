class DataConflictError extends Error {
  constructor(message = 'data conflict') {
    super(message);
    this.name = 'DataConflictError';
    this.statusCode = 409;
  }
}

module.exports = DataConflictError;
