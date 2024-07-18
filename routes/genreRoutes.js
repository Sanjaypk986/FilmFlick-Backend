const express = require("express");
const {
  getAllGenre,
  getGenreById,
  addGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genreController");
const router = express.Router();

// get all genre
router.get("/", getAllGenre);
// get genre by id
router.get("/:genreId", getGenreById);
// add genre
router.post("/", addGenre);
// update genre
router.patch("/:genreId", updateGenre);
// delete genre
router.delete("/:genreId", deleteGenre);

module.exports = router;
