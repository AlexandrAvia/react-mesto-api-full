require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, errors, Joi } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { regex } = require('./utils/constant');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3001 } = process.env;
const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://api.alexavia.mesto.nomoredomains.xyz',
    'https://api.alexavia.mesto.nomoredomains.xyz',
    'http://alexavia.mesto.nomoredomains.xyz',
    'https://alexavia.mesto.nomoredomains.xyz',
  ],
  credentials: true,
};

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('*', cors(options));
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(regex)),
  }),
}), createUser);

// авторизация
app.use(auth);

app.use(userRoutes);
app.use(cardRoutes);
app.use((req, res, next) => {
  next(new NotFoundError('Несуществующая страница.'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  if (!statusCode) {
    res.status(500).send('Внутрення ошибка сервера');
  }
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Всё гуд!');
});
