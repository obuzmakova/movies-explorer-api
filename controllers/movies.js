const Movie = require('../models/movie');
const AccessErr = require('../errors/access-err');

const SUCCESS_STATUS = 200;

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .orFail(new Error('NotValidRequest'))
    .then((movies) => {
      const uMovies = movies.filter((movie) => req.user._id.toString() === movie.owner.toString());
      res.status(SUCCESS_STATUS).send(uMovies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(SUCCESS_STATUS).send(movie);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ _id: req.params.movieId })
    .orFail(new Error('NotValidMovieId'))
    .then((movie) => {
      if ((req.user._id).toString() === (movie.owner).toString()) {
        return movie.remove()
          .then(() => res.status(SUCCESS_STATUS).send(movie));
      }
      throw new AccessErr('Вы не имеете прав удалять фильмы других пользователей');
    })
    .catch(next);
};
