const jwt = require('jsonwebtoken');
const customError = require('../middlewares/customError');
const messages = require('../constants/messages');

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new customError(messages.notAuthorized, 401);
  }
  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = data;
    req.userId = id;
    return next();
  } catch {
    throw new customError(messages.notAuthorized, 401);
  }
}
module.exports = auth;
