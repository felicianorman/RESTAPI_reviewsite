const express = require("express");
const router = express.Router();

// const { UnauthenticatedError, UnauthorizedError } = require("../utils/errors"); - FUTURE.

const {
  createNewReview,
  updateReviewByID,
  deleteReviewByID,
  getReviewByID,
  getAllReviews,
} = require("../controller/reviewController");

router.get("/", getAllReviews);
router.post("/", createNewReview);
router.put("/:reviewID", updateReviewByID);
// router.delete("/:reviewID", deleteReviewByID);
router.get("/:reviewID", getReviewByID);

module.exports = router;
