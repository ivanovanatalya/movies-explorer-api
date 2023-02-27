// routes/cards.js
// это файл маршрутов
const express = require('express');
const { celebrate, Joi } = require('celebrate');

const moviesRouter = express.Router();

const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { URL_REGEX } = require('../constants');

moviesRouter.get('/', getAllMovies);
moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_REGEX),
    trailerLink: Joi.string().required().regex(URL_REGEX),
    thumbnail: Joi.string().required().regex(URL_REGEX),
    owner: Joi.string().required().hex().length(24),
    movieId: Joi.string().hex().length(24),
    nameRu: Joi.string().required(),
    nameEn: Joi.string().required(),
  }),
}), createMovie);
moviesRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

module.exports = moviesRouter;
