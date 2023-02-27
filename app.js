// app.js — входной файл
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { errorHandler } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');

const { PORT = 3000, LOCALHOST = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

app.use(helmet());

// подключаемся к серверу mongo
mongoose.connect(LOCALHOST, {
  useNewUrlParser: true,
});

// подключаем мидлвары, роуты и всё остальное...

app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
