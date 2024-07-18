const Genre = require("../models/genreModel");

// get all genre
const getAllGenre = async (req, res) => {
  const genres = await Genre.find({});
  res.json(genres);
};

// get Genre by id
const getGenreById = async (req, res) => {
  const genre = await Genre.findById(req.params.genreId);
  res.json(genre);
};

// add Genre
const addGenre = async (req, res) => {
  // create document using req.body
  const genre = new Genre(req.body);
  // save document
  await genre.save();
  res.send(genre);
};

//   update Genre
const updateGenre = async (req, res) => {
  const updatedGenre = await Genre.findByIdAndUpdate(
    req.params.genreId,
    req.body,
    { new: true }
  );
  res.send(updatedGenre);
};

//   delete Genre
const deleteGenre = async (req, res) => {
  const deleteGenre = await findByIdAndDelete(req.params.genreId);
  res.send("Genre Deleted");
};

module.exports = {
  getAllGenre,
  getGenreById,
  addGenre,
  updateGenre,
  deleteGenre,
};
