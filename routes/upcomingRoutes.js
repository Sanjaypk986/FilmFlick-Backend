const express = require("express");
const {} = require("../controllers/moviesController");
const {
  upcomingMovies,
  upcomingMovieById,
  addUpcomingMovie,
  updateUpcomingMovie,
  deleteUpcomingMovie,
} = require("../controllers/upcomingController");
const router = express.Router();

//get all movies
router.get("/", upcomingMovies);
// get movie by id
router.get("/:movieId", upcomingMovieById);
// add movie
router.post("/", addUpcomingMovie);
// update movie
router.patch("/:movieId", updateUpcomingMovie);
// delete movie
router.delete("/:movieId", deleteUpcomingMovie);

module.exports = router;
