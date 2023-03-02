const { NotFoundError, BadRequestError } = require("../utils/errors");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");

//skapa ny review
exports.createNewReview = async (req, res) => {
  try {
    return res.send("Create new review"); //scaffoldreturn
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

//uppdatera review via id
exports.updateReviewById = async (req, res) => {
  try {
    return res.send("Update review"); //scaffoldreturn
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

//radera review via id
exports.deleteReviewById = async (req, res) => {
  try {
    return res.send("Delete review"); //scaffoldreturn
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

//hämta review via id
exports.getReviewById = async (req, res) => {
  try {
    return res.send("Get review by id"); //scaffoldreturn
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

//hämta alla reviews
exports.getAllReviews = async (req, res) => {
  try {
    return res.send("Get all reviews"); //scaffoldreturn
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
