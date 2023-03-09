const express = require("express");
const router = express.Router();

const { UnauthenticatedError, UnauthorizedError } = require("../utils/errors");

const {
  createNewReview,
  updateReview,
  deleteReviewByID,
  getReviewById,
  getAllReviews,
} = require("../controller/reviewController");

// router.get("/", getAllReviews);
router.post("/", createNewReview);
<<<<<<< HEAD
// router.put("/:reviewID", updateReview);
// router.delete("/:reviewID", deleteReviewByID);
router.get("/:reviewID", getReviewById);
=======
router.put("/:reviewID", updateReview);
// router.delete("/:reviewID", deleteReviewByID);
// router.get("/:reviewID", getReviewById);
>>>>>>> b7e8d4ed1930079d3f2cfee24b9bbe8c9da57d8c

module.exports = router;
