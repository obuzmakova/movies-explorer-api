const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string(),
    director: Joi.string(),
    duration: Joi.number(),
    year: Joi.string(),
    description: Joi.string(),
    image: Joi.string().custom(method),
    trailer: Joi.string().custom(method),
    nameRU: Joi.string(),
    nameEN: Joi.string(),
    thumbnail: Joi.string().custom(method),
    movieId: Joi.string(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string(),
  }),
}), deleteMovie);

module.exports = router;
