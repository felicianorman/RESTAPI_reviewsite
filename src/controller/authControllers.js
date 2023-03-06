const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { userRoles } = require("../constants/users");

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const [users, metadata] = await sequelize.query(
    'SELECT id FROM "user" LIMIT 1;'
  );

  if (!users || users.length < 1) {
    await sequelize.query(
      'INSERT INTO "user" (username, email, password) VALUES ($username, $email, $password)',
      {
        bind: {
          username: username,
          email: email,
          password: hashPassword,
        },
      }
    );
  } else {
    await sequelize.query(
      "INSERT INTO user (email, password, username) VALUES($email, $password, $username)",
      {
        bind: {
          password: hashPassword,
          username: username,
          email: email,
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
  };

  const jwtToken = jwt.sign(jwtPayload, process.env.JWT_TOKEN, {
    expiresIn: "1h",
  });

  return res.json({
    token: jwtToken,
    user: jwtPayload,
  });
};
