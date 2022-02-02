const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().required(),
    password: Joi.string().required().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);

module.exports = router;
