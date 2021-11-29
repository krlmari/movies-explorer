const { celebrate, Joi } = require("celebrate");

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

const validateGetUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    trailer: Joi.string().required(),
    thumbnail: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required(),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

const validateGetMovies = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().min(2).max(200).required(),
    })
    .unknown(),
});

module.exports = {
  validateAuth,

  validateCreateUser,
  validateUpdateUser,
  validateGetUserId,

  validateCreateMovie,
  validateGetMovies,
  validateDeleteMovie,
};
