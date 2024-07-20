const Review = require("../models/reviewModel");

// get all review
const getAllReview = async (req, res) => {
  try {
    const reviews = await Review.find(req.query).populate('user');
    res.json( reviews);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
// add Review
const addReview = async (req, res) => {
  // create document using req.body
  try {
    const review = new Review({
      ...req.body,
      user: req.user._id,
    });
    // save document
    await review.save();
    // populate the user field
    await review.populate({
      path: 'user',
      select: 'name'
    });
    console.log('Populated User:', review.user);
    res.send(review);
  } catch (error) {
    res.status(400).send("Please check data");
  }
};
// update review
const updateReview = async (req, res) => {
  try {
    // Extract updated data from request body
    const { title, description } = req.body;

    // Validate input data
    if (typeof title !== 'string' || typeof description !== 'string') {
      return res.status(400).send("Invalid data format");
    }

    // Update the review in the database
    const updatedReview = await Review.findOneAndUpdate(
      { _id: req.params.reviewId, user: req.user._id }, // Find review by ID and user ID
      { title, description }, // Fields to update
      { new: true } // Return the updated document
    );

    // Check if review was found and updated
    if (!updatedReview) {
      return res.status(404).send("Review not found");
    }

    // Send updated review as response
    res.json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete({_id:req.params.reviewId,user:req.user._id});

    if (!deletedReview) {
      return res.status(404).send({ message: 'Review not found' });
    }

    res.status(200).send({ message: 'Review deleted successfully', review: deletedReview });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting review', error: error.message });
  }
};

module.exports = { addReview, getAllReview ,deleteReview,updateReview};
