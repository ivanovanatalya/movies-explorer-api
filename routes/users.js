// routes/users.js
// это файл маршрутов
const express = require('express');

const usersRouter = express.Router();

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');
const { userValidation } = require('../middlewares/validation');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', userValidation, updateUser);

module.exports = usersRouter;
