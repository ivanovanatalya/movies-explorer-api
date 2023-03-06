const { PORT = 3000, LOCALHOST = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const SECRET_KEY_DEV = 'some-secret-key';

module.exports = {
  PORT,
  LOCALHOST,
  SECRET_KEY_DEV,
};
