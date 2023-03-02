const { NotFoundError, BadRequestError } = require("../utils/errors");
const { sequelize } = require("../database/config"); //Varför hittar den ej?
const { QueryTypes } = require("sequelize"); //Vad är detta för filväg i jämförelse med de ovan? Hur plockar den upp?

//skapa ny review
exports.createNewReview = async (req, res) => {
  try {
    return res.send("Create your review"); //scaffoldreturn
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
    return res.send("Update your review"); //scaffoldreturn
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
    return res.send("Delete your review"); //scaffoldreturn
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
    return res.send("Collect review by id"); //scaffoldreturn
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
    return res.send("Collect all reviews"); //scaffoldreturn
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
