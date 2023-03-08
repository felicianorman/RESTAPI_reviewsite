const { NotFoundError, BadRequestError } = require("../utils/errors");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize"); //Vad är detta för filväg i jämförelse med de ovan? Hur plockar den upp?

//skapa ny review ***
exports.createNewReview = async (req, res) => {
  const { review_title, review_description, review_rating } = req.body;
  const hairId = req.params.hairId;
  const userId = req.user.userId;

  const [newReviewId] = await sequelize.query(
    `
      INSERT INTO review (title, description, rating, fk_user_id, fk_company_id)
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

//uppdatera review via id ***
exports.updateReview = async (req, res) => {
  const reviewId = req.params.reviewId;

  const { descriptionText, rating } = req.body;
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  //hämta usern via ID, via token
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const userId = payload.userId;
  const role = payload.role;
  console.log(payload);

  console.log(userRoles.ADMIN);
  console.log(role);

  //hämta reviewen via DB
  const [reviewPickUp, metadata] = await sequelize.query(
    `SELECT fk_user_id FROM review WHERE ID = $reviewId;`,
    {
      bind: {
        reviewId: reviewId,
      },
      type: QueryTypes.SELECT,
    }
  );

  if (reviewPickUp.fk_user_id !== userId || role !== userRoles.ADMIN) {
    throw new UnauthorizedError("Du kan inte uppdatera någon annans review");
  }

  if (!descriptionText && !rating) {
    throw new BadRequestError(
      "Du måste lägga till en recension och/eller ett betyg"
    );
  }

  if (!descriptionText && rating) {
    const [updateReview, metadata] = await sequelize.query(
      `UPDATE review SET rating = $rating
      WHERE id = $reviewId RETURNING *;`,
      {
        bind: {
          reviewId: reviewId,
          rating: rating,
        },
        type: QueryTypes.UPDATE,
      }
    );
  } else {
    if (descriptionText && !rating) {
      const [updateReview, metadata] = await sequelize.query(
        `UPDATE review SET description = $description
        WHERE id = $reviewId RETURNING *;`,
        {
          bind: {
            reviewId: reviewId,
            description: descriptionText,
          },
          type: QueryTypes.UPDATE,
        }
      );
    } else {
      const [updateReview, metadata] = await sequelize.query(
        `UPDATE review SET description = $description, rating = $rating
        WHERE id = $reviewId RETURNING *;`,
        {
          bind: {
            reviewId: reviewId,
            description: descriptionText,
            rating: rating,
          },
          type: QueryTypes.UPDATE,
        }
      );
    }
  }

  return res.sendStatus(200).send(updateReview);
};

//radera review via id ***
exports.deleteReviewById = async (req, res) => {
  const reviewId = req.params.reviewid;
  const userId = req.user.userId;

  const [result_reviews] = await sequelize.query(
    `SELECT * FROM review WHERE id = $reviewId;`,
    {
      bind: { reviewId: reviewId },
      type: QueryTypes.SELECT,
    }
  );

  if (!result_reviews)
    throw new NotFoundError("Den recension som du söker finns ej");

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
    throw new UnauthorizedError("Det finns ingenting att radera här");
  }
};

//hämta review via id ------------------------------------------------ FRÅGA PETTER OM HJÄLP
exports.getReviewById = async (req, res) => {
  const userId = req.params.userId;

  const [review, metadata] = await sequelize.query(
    `
  SELECT  review.id, review.title, review.rating, review.fk_hairdresser_id AS hairdresser, user.user_name AS user, review.fk_user_id AS user_ID 
  FROM review
  JOIN user ON user.id = review.fk_user_id
  WHERE review.fk_user_id = $userId
    `,
    {
      bind: { userId: userId },
    }
  );

  if (!review)
    throw new NotFoundError(
      "Tyvärr har denna kund inte skrivit någon recension än!"
    );

  return res.json(review);
};

//hämta alla reviews ***
exports.getAllReviews = async (req, res) => {
  try {
    const [review, metadata] = await sequelize.query(`
    SELECT * FROM review
    `);
    return res.send("Hämta alla recensioner"); //scaffoldreturn
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
