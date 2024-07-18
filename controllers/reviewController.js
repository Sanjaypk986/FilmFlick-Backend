const Review = require("../models/reviewModel");

// get all review
const getAllReview = async (req, res) => {
  try {
    const reviews = await Review.find(req.query).populate('user');
    res.json(reviews);
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
const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.reviewId);

    if (!deletedReview) {
      return res.status(404).send({ message: 'Review not found' });
    }

    res.status(200).send({ message: 'Review deleted successfully', review: deletedReview });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting review', error: error.message });
  }
};

module.exports = { addReview, getAllReview ,deleteReview};
