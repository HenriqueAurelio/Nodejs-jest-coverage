class customError extends Error {
  constructor(msg, status) {
    super(msg);
    this.statusCode = status;
  }
}

module.exports = customError;
