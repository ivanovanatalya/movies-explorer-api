// controllers/cards.js
// это файл контроллеров
const { mongoose } = require('mongoose');
const Movie = require('../models/movies');
const {
  NotFoundError,
  ForbiddenError,
  GeneralError,
} = require('../middlewares/errors');
const { CREATED_CODE } = require('../constants');

const getAllMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner', 'movieId'])
    .then((allMovies) => res.send([...allMovies]))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRu,
    nameEn,
  } = req.body;
  const { _id: owner } = req.user;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRu,
    nameEn,
  })
    .then((movie) => res.status(CREATED_CODE).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new GeneralError('Переданы некорректные данные при создании фильма'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id: userId } = req.user;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден');
      }
      if (!movie.owner.equals(userId)) {
        throw new ForbiddenError();
      }
      return Movie.findByIdAndDelete(movieId);
    })
    .then(() => res.send({ message: 'Фильм удалён' }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new GeneralError('Фильм с указанным _id не найден'));
      }
      return next(err);
    });
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
