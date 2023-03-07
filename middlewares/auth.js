// middlewares/auth.js

const jwt = require('jsonwebtoken');
const UnauthError = require('../errors/UnauthError');

const { SECRET_KEY_DEV } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthError());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY_DEV,
    );
  } catch (err) {
    return next(new UnauthError());
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};

module.exports = auth;
