const express = require("express");
const { getAllReview, addReview, deleteReview } = require("../controllers/reviewController");
const protect = require("../middlewares/protect");
const router = express.Router();

// get all review
router.get("/", getAllReview);
// add review
router.post("/",protect, addReview);
router.delete("/:reviewId",deleteReview);

module.exports = router;
