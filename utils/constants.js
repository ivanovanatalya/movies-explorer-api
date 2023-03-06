const Message = {
  BAD_MOVIE_REQUEST: 'Переданы некорректные данные при создании фильма',
  ACTION_FORBIDDEN: 'Действие запрещено',
  MOVIE_NOT_FOUND: 'Фильм с указанным _id не найден',
  NOT_FOUND_URL: 'Неверный путь',
  SERVER_ERROR: 'Сервер сейчас упадёт',
  USER_CONFLICT: 'Пользователь с указанным email уже существует',
  USER_NOT_FOUND: 'Пользователь по указанному _id не найден',
  BAD_USER_REQUEST: 'Переданы некорректные данные при создании пользователя',
};
const CREATED_CODE = 201;
const SERVER_ERROR_CODE = 500;

const URL_REGEX = /https?:\/\/(?:www.)?[0-9A-z-._~:/?#[\]@!$&'()*+,;=]+/;

module.exports = {
  Message,
  CREATED_CODE,
  SERVER_ERROR_CODE,
  URL_REGEX,
};
