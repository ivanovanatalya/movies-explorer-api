const CREATED_CODE = 201;
const SERVER_ERROR_CODE = 500;

const URL_REGEX = /https?:\/\/(?:www.)?[0-9A-z-._~:/?#[\]@!$&'()*+,;=]+/;

const SECRET_KEY_DEV = 'some-secret-key';

module.exports = {
  CREATED_CODE,
  SERVER_ERROR_CODE,
  URL_REGEX,
  SECRET_KEY_DEV,
};
