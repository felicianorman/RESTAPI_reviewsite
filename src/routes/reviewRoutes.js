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

router.get("/", getAllReviews);
router.post("/", createNewReview);
// router.put("/:reviewID", updateReview);
// router.delete("/:reviewID", deleteReviewByID);
router.get("/:reviewID", getReviewById);

module.exports = router;
