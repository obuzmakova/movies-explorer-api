const ERROR_DATA = 400;
const NOT_FOUND = 404;
const DOUBLE_EMAIL = 409;

module.exports = (err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError' || err.message === 'NotValidRequest') {
    res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' });
  } else if (err.message === 'NotValidMovieId') {
    res.status(NOT_FOUND).send({ message: 'Фильм с указанным id не найден' });
  } else if (err.message === 'NotValidId') {
    res.status(NOT_FOUND).send({ message: 'Пользователь с указанным id не найден' });
  } else if (err.message === 'RouteError') {
    res.status(NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
  } else if (err.name === 'MongoError' && err.code === 11000) {
    res.status(DOUBLE_EMAIL).send({ message: 'Пользователь с таким адресом уже существует' });
  } else if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    const { statusCode = 500, message } = err;

    res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
  }
  next();
};
