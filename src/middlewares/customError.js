class customError extends Error {
  constructor(msg, status) {
    super(msg);
    this.name = 'Internal Server Error';
    this.statusCode = status || 500;
  }
}

module.exports = customError;
