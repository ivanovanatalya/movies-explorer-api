// routes/cards.js
// это файл маршрутов
const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { Message } = require('../utils/constants');
const { signupValidation, signinValidation } = require('../middlewares/validation');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.all('*', (req, res, next) => next(new NotFoundError(Message.NOT_FOUND_URL)));

module.exports = router;
