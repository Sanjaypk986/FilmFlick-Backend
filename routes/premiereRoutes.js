const express = require("express");
const {} = require("../controllers/moviesController");
const {
  premiereMovies,
  premiereMovieById,
  addPremiereMovie,
  updatePremiereMovie,
  deletePremiereMovie,
} = require("../controllers/premiereController");
const router = express.Router();

//get all movies
router.get("/", premiereMovies);
// get movie by id
router.get("/:movieId", premiereMovieById);
// add movie
router.post("/", addPremiereMovie);
// update movie
router.patch("/:movieId", updatePremiereMovie);
// delete movie
router.delete("/:movieId", deletePremiereMovie);

module.exports = router;
