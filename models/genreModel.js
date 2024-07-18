const mongoose = require('mongoose');

// create schema
const genreSchema = new mongoose.Schema({
    title: String,
  });

//   create model using schema
  const Genre = mongoose.model('Genre', genreSchema);

  module.exports = Genre