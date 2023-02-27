// routes/cards.js
// это файл маршрутов
const express = require('express');
const { celebrate, Joi } = require('celebrate');

const moviesRouter = express.Router();

const {
  getAllCards,
  createCard,
  deleteCard,
} = require('../controllers/cards');
const { URL_REGEX } = require('../constants');

moviesRouter.get('/', getAllCards);
moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(URL_REGEX),
  }),
}), createCard);
moviesRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteCard);

module.exports = moviesRouter;
