// controllers/users.js
// это файл контроллеров
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const { default: mongoose } = require('mongoose');
const User = require('../models/users');

const NotFoundError = require('../errors/NotFoundError');
const GeneralError = require('../errors/GeneralError');
const DataConflictError = require('../errors/DataConflictError');
const ForbiddenError = require('../errors/ForbiddenError');
const { Message } = require('../utils/constants');
const { SECRET_KEY_DEV } = require('../utils/config');

const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      return res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password: pass,
  } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  bcrypt.hash(pass, 10)
    .then((hashPass) => User.create({
      name,
      email,
      password: hashPass,
    })
      .then((user) => {
        const { _doc: { password, ...userRes } } = user;
        const token = jwt.sign(
          { _id: userRes._id },
          NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY_DEV,
          { expiresIn: 7200 },
        );
        res.send({ token, ...userRes });
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          return next(new GeneralError('Переданы некорректные данные при создании пользователя'));
        }

        if (err.code === 11000) {
          return next(new DataConflictError('e-mail already exists'));
        }
        return next(err);
      }));
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser !== null && `${existingUser._id}` !== req.user._id) {
        throw new ForbiddenError(Message.USER_CONFLICT);
      }
      User.findByIdAndUpdate(
        req.user._id,
        { $set: { email, name } }, // добавить _id в массив, если его там нет
        { new: true, runValidators: true },
      )
        .then((user) => {
          if (user === null) {
            throw new NotFoundError(Message.USER_NOT_FOUND);
          }
          return res.send(user);
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            return next(new GeneralError(Message.BAD_USER_REQUEST));
          }
          return next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY_DEV,
        { expiresIn: 7200 },
      );
      return res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  createUser,
  updateUser,
  login,
};
