const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { userRoles } = require("../constants/users");


exports.register = async (req, res) => {
  const { username, password, email, fk_user_role_id} = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const [users, metadata] = await sequelize.query(
    'SELECT id FROM "user" LIMIT 1;'
  );

  if (!users || users.length < 1) {
    await sequelize.query(
      'INSERT INTO "user" (username, email, password, fk_user_role_id) VALUES ($username, $email, $password, $fk_user_role_id)',
      {
        bind: {
          username: username,
          email: email,
          password: hashPassword,
          fk_user_role_id: fk_user_role_id
        },
      }
    );
  } else {
    await sequelize.query(
      "INSERT INTO user (email, password, username, fk_user_role_id) VALUES($email, $password, $username, $fk_user_role_id)",
      {
        bind: {
          password: hashPassword,
          username: username,
          email: email,
          fk_user_role_id: fk_user_role_id
        },
      }
    );
  }

  return res.status(201).json({
    message: "Successfully registered. You can now log in.",
  });
};

exports.login = async (req, res) => {
  const { username, password: candidatePassword } = req.body;

  const [user, metadata] = await sequelize.query(
    "SELECT * FROM user WHERE username = $username LIMIT 1;",
    {
      bind: { username },
      type: QueryTypes.SELECT,
    }
  );

  if (!user) return new Error("Wrong credentials");

  const checkPassword = await bcrypt.compare(candidatePassword, user.password);

  const jwtPayload = {
    userId: user.id,
    username: user.username,
    role:  userRoles.ADMIN === user.fk_user_role_id ? userRoles.ADMIN : userRoles.USER
    
  };

  const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.json({
    token: jwtToken,
    user: jwtPayload,
  });
};
