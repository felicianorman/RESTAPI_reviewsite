const express = require("express");
const router = express.Router();
const { userRoles } = require("../constants/users"); //DOESNT WORK - table or userRoles?
const { isAuthenticated } = require("../middleware/authenticationMiddleware");

// const { UnauthenticatedError, UnauthorizedError } = require("../utils/errors"); - FUTURE.

const {
  createNewReview,
  updateReviewByID, //DOESNT WORK?
  deleteReviewById,
  getReviewByID, //DOESNT WORK?
  getAllReviews,
} = require("../controller/reviewController");

router.post("/", isAuthenticated, createNewReview);
router.put("/", isAuthenticated, updateReviewById);
router.delete("/", isAuthenticated, deleteReviewById);
router.get("/", getReviewById);
router.get("/", getAllReviews);

module.exports = router;
