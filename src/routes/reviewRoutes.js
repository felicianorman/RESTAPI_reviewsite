const express = require("express");
const router = express.Router();
const { userRoles } = require("../constants/users");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");

// const { UnauthenticatedError, UnauthorizedError } = require("../utils/errors"); - FUTURE.

const {
  createNewReview,
  updateReviewByID,
  deleteReviewById,
  getReviewByID,
  getAllReviews,
} = require("../controller/reviewController");

router.post("/", isAuthenticated, createNewReview);
router.put("/:reviewId", isAuthenticated, updateReviewById);
router.delete("/:reviewId", isAuthenticated, deleteReviewById);
router.get("/:reviewId", getReviewById);
router.get("/", getAllReviews);

module.exports = router;
