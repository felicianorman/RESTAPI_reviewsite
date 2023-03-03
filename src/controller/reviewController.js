const { NotFoundError, BadRequestError } = require("../utils/errors");
const { sequelize } = require("../database/config"); //Varför hittar den ej?
const { QueryTypes } = require("sequelize"); //Vad är detta för filväg i jämförelse med de ovan? Hur plockar den upp?

//skapa ny review ***
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

  await sequelize.query(``);
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

//radera review via id ***
exports.deleteReviewById = async (req, res) => {
  const reviewId = req.params.reviewid;
  const userId = req.user.userId;
  //console.log(reviewId);
  //console.log(userId);
  const [result_reviews] = await sequelize.query(
    `SELECT * FROM review WHERE id = $reviewId;`,
    {
      bind: { reviewId: reviewId },
      type: QueryTypes.SELECT,
    }
  );

  if (!result_reviews)
    throw new NotFoundError(
      "There is no such review like the one you're asking for"
    );
  if (req.user.role == userRoles.ADMIN || userId == result_reviews.fk_user_id) {
    await sequelize.query(
      "DELETE FROM review WHERE id = $reviewId RETURNING *",
      {
        bind: { reviewId: reviewId },
        type: QueryTypes.DELETE,
      }
    );
    return res.sendStatus(204);
  } else {
    throw new UnauthorizedError("There's nothing to delete");
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

//hämta alla reviews ***
exports.getAllReviews = async (req, res) => {
  try {
    const [reviews, metadata] = await sequelize.query(`
    SELECT * FROM reviews 
    `);
    return res.send("Collect all reviews"); //scaffoldreturn
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
