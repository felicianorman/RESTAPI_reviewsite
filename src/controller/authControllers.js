const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { userRoles } = require("../constants/users");
const { UnauthenticatedError } = require("../utils/errors");

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const [users, metadata] = await sequelize.query(
    'SELECT id FROM "user" LIMIT 1;'
  );

  if (!users || users.length < 1) {
    await sequelize.query(
      'INSERT INTO "user" ( username, email, password, fk_user_role_id) VALUES ($email, $password, $username, 1)',
      {
        bind: {
          email: email,
          password: hashPassword,
          username: username,
        },
      }
    );
  } else {
    await sequelize.query(
      "INSERT INTO user (email, password, username, fk_user_role_id ) VALUES($email, $password, $username, 2)",
      {
        bind: {
          password: hashPassword,
          email: email,
          username: username,
        },
      }
    );
  }

  return res.status(201).json({
    message: "Successfully registered. You can now log in.",
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password: candidatePassword } = req.body;

    const [user, metadata] = await sequelize.query(
      "SELECT * FROM user JOIN role ON user.fk_user_role_id = role.id WHERE email = $email LIMIT 1;",
      {
        bind: { email },
        type: QueryTypes.SELECT,
      }
    );

    if (!user) return new UnauthenticatedError("Invalid credentials");

    const checkPassword = await bcrypt.compare(
      candidatePassword,
      user.password
    );

    if (!checkPassword) return new UnauthenticatedError("Invalid credentials");

    const jwtPayload = {
      userId: user.id,
      email: user.email,
      role:
        userRoles.ADMIN === user.user_role ? userRoles.ADMIN : userRoles.USER,
    };

    const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      token: jwtToken,
      user: jwtPayload,
    });
  } catch (error) {
    console.log("You must input valid credentials");
  }
};
