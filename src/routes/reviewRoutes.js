const express = require("express");
const router = express.Router();

const { UnauthenticatedError, UnauthorizedError } = require("../utils/errors");

const {
  createNewReview,
  updateReview,
  deleteReviewById,
  getReviewById,
  getAllReviews,
} = require("../controller/reviewController");

router.get("/", getAllReviews);
router.post("/", isAuthenticated, createNewReview);
router.put("/:reviewID", isAuthenticated, updateReview);
router.delete("/:reviewID", isAuthenticated, deleteReviewById);
router.get("/:reviewID", isAuthenticated, getReviewById);

module.exports = router;
