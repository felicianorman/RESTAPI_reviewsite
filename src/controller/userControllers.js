const { userRoles } = require("../constants/users");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { UnauthorizedError, NotFoundError } = require("../utils/errors");

exports.getAllUsers = async (req, res) => {
  const offset = req.query.offset;
  const limit = req.query.limit;

  if (req.user.user_role !== userRoles.ADMIN) {
    throw new UnauthorizedError("You do not have access");
  } else {
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
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.userId;

  const [user, metadata] = await sequelize.query(
    "SELECT id, username FROM user WHERE id = $userId",
    {
      bind: { userId },
      type: QueryTypes.SELECT,
    }
  );

  if (!user) return new NotFoundError();

  return res.json(user);
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.userId;

  if (
    userId != req.user.userId &&
    req.user.fk_user_role_id !== userRoles.ADMIN
  ) {
    throw new UnauthorizedError("You do not have access");
  }

  const [user, metadata] = await sequelize.query(
    "DELETE FROM user WHERE id = $userId;",
    {
      bind: { userId: userId },
    }
  );

  return res.sendStatus(204);
};
