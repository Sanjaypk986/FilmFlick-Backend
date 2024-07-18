const mongoose = require('mongoose');

// create schema
const reviewSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description:{
      type: String,
      required: true
    },
    user:{
       type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    movie:{
      type: mongoose.ObjectId,
       ref: 'Movie',
       required: true
   }
  });

//   create model using schema
  const Review = mongoose.model('Review', reviewSchema);

  module.exports = Review