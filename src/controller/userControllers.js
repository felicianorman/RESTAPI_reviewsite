const { userRoles } = require("../constants/users");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { UnauthorizedError, NotFoundError } = require("../utils/errors");

exports.getAllUsers = async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    const offset = req.query.offset || 0;

    if (req.user.role !== userRoles.ADMIN) {
      throw new UnauthorizedError("Unauthorized Access");
    }

    const [users, metadata] = await sequelize.query(
      `SELECT id, username FROM "user" LIMIT $limit OFFSET $offset;`,
      {
        bind: {
          offset: offset,
          limit: limit,
        },
      }
    );
    return res.json(users);
  } catch (error) {
    return res.status(error.statusCode || 500).json(error.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const [user, metadata] = await sequelize.query(
      "SELECT id, username FROM user WHERE id = $userId",
      {
        bind: { userId },
        type: QueryTypes.SELECT,
      }
    );

    if (!user) throw new NotFoundError("That user does not exist");

    return res.json(user);
  } catch (error) {
    return res.status(error.statusCode || 500).json(error.message);
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const [user, metadata] = await sequelize.query(
      "DELETE FROM user WHERE id = $userId;",
      {
        bind: { userId: userId },
      }
    );

    return res.sendStatus(204);

  } catch (error) {
    return res.status(error.statusCode || 500).json(error.message);
  }
};
