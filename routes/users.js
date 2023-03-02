// routes/users.js
// это файл маршрутов
const express = require('express');
const { celebrate, Joi } = require('celebrate');

const usersRouter = express.Router();

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = usersRouter;
