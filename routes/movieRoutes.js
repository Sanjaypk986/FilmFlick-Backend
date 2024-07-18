const express = require("express");
const {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/moviesController");
const router = express.Router();

//get all movies
router.get("/", getAllMovies);
// get movie by id
router.get("/:movieId", getMovieById);
// add movie
router.post("/", addMovie);
// update movie
router.patch("/:movieId", updateMovie);
// delete movie
router.delete("/:movieId", deleteMovie);

module.exports = router;
