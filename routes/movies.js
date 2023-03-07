// routes/cards.js
// это файл маршрутов
const express = require('express');

const moviesRouter = express.Router();

const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

moviesRouter.get('/', getAllMovies);
moviesRouter.post('/', createMovieValidation, createMovie);
moviesRouter.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = moviesRouter;
