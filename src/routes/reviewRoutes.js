const express = require("express");
const router = express.Router();
const { userRoles } = require("../constants/users"); //DOESNT WORK - table or userRoles?
const { isAuthenticated } = require("../middleware/authenticationMiddleware");

// const { UnauthenticatedError, UnauthorizedError } = require("../utils/errors"); - FUTURE.

const {
  createNewReview,
  updateReviewByID,
  deleteReviewByID,
  getReviewByID,
  getAllReviews,
} = require("../controller/reviewController");

router.post("/", isAuthenticated, createNewReview);
router.put("/", isAuthenticated, updateReviewByID);
router.delete("/", isAuthenticated, deleteReviewByID);
router.get("/", getReviewByID);
router.get("/", getAllReviews);

module.exports = router;
