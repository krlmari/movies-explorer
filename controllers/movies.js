const Movies = require("../models/movie");

const getMovies = (req, res, next) => {
  Movies.find({})
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError("Запрашиваемые фильмы не найдены!");
      }
      res.send({ data: movies });
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
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
  Movies.create({
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
    .then((movie) => res.send({ data: movie }))
    .catch(() => {
      throw new NotFoundError("Переданы неккоректные данные фильма.");
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { MovieId } = req.params;

  Movies.findById(MovieId).then((movie) => {
    if (movie.owner.equals(req.user._id)) {
      Movies.findByIdAndRemove(MovieId)
        .then(() => {
          res.status(200).send({ message: "Фильм удалён" });
        })
        .catch(next);
    } else {
      throw new NotOwnerIdError("Удалять можно только свои фильмы!");
    }
  });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
