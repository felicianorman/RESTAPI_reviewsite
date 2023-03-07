const { userRoles } = require("../constants/users");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { UnauthorizedError } = require("../utils/errors");

exports.getAllUsers = async (req, res) => {
  const [users, metadata] = await sequelize.query(
    `SELECT id, username FROM "user" LIMIT 5;`
  );
  return res.json(users);
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

  if (!user) return new Error("Den användaren finns inte");

  return res.json(user);
};

//lägg till admin
exports.deleteUserById = async (req, res) => {
  // const userId = req.params.userId;
  const user = req.user;

  // console.log(userId)

  console.log(user)

    // if(userId != req.user?.userId && req.user.fk_user_role_id !== userRoles.ADMIN) {
    //   throw new Error('nej')
    // }



  // const [results, metadata] = await sequelize.query(
  //   "DELETE FROM user WHERE id = $userId RETURNING *",
  //   {
  //     bind: { userId },
  //   }
  // );

  return res.send("Hej")
};
