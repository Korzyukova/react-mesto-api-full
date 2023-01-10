/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');

const routes = require('./routes');
const { createUser, login } = require('./controllers/users');
const { NotFoundError404 } = require('./middlewares/errorHandlers');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorMsg404 = 'Не найдено';

const app = express();
app.use(express.json());

const allowedCors = [
  'https://korzuk.students.nomoredomains.club',
  'http://korzuk.students.nomoredomains.club',
  'localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
    const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

    // Если это предварительный запрос, добавляем нужные заголовки
    if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    }

    const requestHeaders = req.headers['access-control-request-headers'];
    if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы с этими заголовками
      res.header('Access-Control-Allow-Headers', requestHeaders);
      // завершаем обработку запроса и возвращаем результат клиенту
      return res.end();
    }
  }

  next();
});

app.use(routes);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      password: Joi.string().required(),
      email: Joi.string()
        .email()
        .required()
        .pattern(
          /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i,
        ),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      password: Joi.string().required(),
      email: Joi.string()
        .email()
        .required()
        .pattern(
          /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i,
        ),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string()
        .pattern(
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i,
        )
        .uri(),
    }),
  }),
  createUser,
);
app.all('*', () => {
  throw new NotFoundError404(errorMsg404);
});
app.use(errorLogger);
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/mestodb');
