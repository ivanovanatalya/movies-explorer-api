// models/user.js
const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthError = require('../errors/UnauthError');

// Опишем схему:
const userSchema = new mongoose.Schema({
  // about: {
  //   type: String,
  //   minlength: 2,
  //   maxlength: 30,
  //   default: 'Исследователь',
  // },
  // avatar: {
  //   type: String,
  //   validate: {
  //     validator: (v) => URL_REGEX.test(v),
  //     message: 'Некорректный URL',
  //   },
  //   default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  // },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный e-mail',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthError();
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthError();
          }

          return user; // теперь user доступен
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
