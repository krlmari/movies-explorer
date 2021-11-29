const moviesRouter = require("express").Router();
const {
  validateCreateMovie,
  validateGetMovies,
  validateDeleteMovie,
} = require("../middlewares/validations");

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require("../controllers/movies");

moviesRouter.get("/movies", validateGetMovies, getMovies);
moviesRouter.post("/movies", validateCreateMovie, createMovie);
moviesRouter.delete("/movies/movieId ", validateDeleteMovie, deleteMovie);

module.exports = moviesRouter;
