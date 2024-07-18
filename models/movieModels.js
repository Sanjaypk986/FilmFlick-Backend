const mongoose = require("mongoose");

// create schema
const movieSchema = new mongoose.Schema({
  title: String,
  language: [String],
  description: String,
  thumbnail: String,
  poster: String,
  duration: String,
  genre: [String],
  releaseDate:String
});

//   create model using schema
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;