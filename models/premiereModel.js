const mongoose = require("mongoose");

// create schema
const premiereSchema = new mongoose.Schema({
  title: String,
  language: [String],
  description: String,
  thumbnail: String,
  poster: String,
  duration: String,
  genre: [String],
  releasedDate:String
});

//   create model using schema
const Premiere = mongoose.model("Premiere", premiereSchema);

module.exports = Premiere;