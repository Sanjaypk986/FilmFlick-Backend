const mongoose = require("mongoose");

// create schema
const upcomingSchema = new mongoose.Schema({
  title: String,
  language: [String],
  description: String,
  thumbnail: String,
  poster: String,
  duration: String,
  genre: [String],
  releasingDate:String
});

//   create model using schema
const Upcoming = mongoose.model("Upcoming", upcomingSchema);

module.exports = Upcoming;