const { NotFoundError, BadRequestError } = require("../utils/errors");
const { sequelize } = require("../database/config"); //Varför hittar den ej?
const { QueryTypes } = require("sequelize"); //Vad är detta för filväg i jämförelse med de ovan? Hur plockar den upp?

//skapa ny review
exports.createNewReview = async (req, res) => {
  const { review_title, review_description, review_rating } = req.body;
  const hairId = req.params.hairId;
  const userId = req.user.userId;

  const [newReviewId] = await sequelize.query(
    `
      INSERT INTO reviews (review_title, review_description, review_rating, fk_user_id, fk_hair_id)
      VALUES ($review_title, $review_description, $review_rating, $fk_user_id, $fk_hair_id);
      `,
    {
      bind: {
        review_title: review_title,
        review_description: review_description,
        review_rating: review_rating,
        fk_user_id: userId,
        fk_hair_id: hairId,
      },
      type: QueryTypes.INSERT,
    }
  );

  return res
    .setHeader(
      "Location",
      `${req.protocol}://${req.headers.host}/api/v1/reviews/${newReviewId.reviewId}`
    )
    .sendStatus(201);
};

//uppdatera review via id
exports.updateReviewByID = async (req, res) => {
  try {
    const reviewID = req.params.reviewID;
    return res.send(`Update your review ${reviewID}`); //scaffoldreturn
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

//radera review via id
exports.deleteReviewByID = async (req, res) => {
  try {
    const reviewID = req.params.reviewID;
    return res.send(`Delete your review ${reviewID}`); //scaffoldreturn
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

//hämta review via id
exports.getReviewByID = async (req, res) => {
  try {
    const reviewID = req.params.reviewID;
    return res.send(`Collect review by id ${reviewID}`); //scaffoldreturn
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
    // här inne.
    return res.send("Collect all reviews"); //scaffoldreturn
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
