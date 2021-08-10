const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getProfileInfo, updateProfile,
} = require('../controllers/users');

const method = (value) => {
  if (validator.isURL(value)) {
    return value;
  }
  throw new Error('URL validation err');
};

router.get('/me', getProfileInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().custom(method),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

module.exports = router;