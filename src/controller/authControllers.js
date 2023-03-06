const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { userRoles } = require("../constants/users");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const [users, metadata] = await sequelize.query(
    `SELECT id FROM "user" LIMIT 1;`
  );

  if (!users || users.length < 1) {
    await sequelize.query(
      `INSERT INTO "user" (username, email, password) VALUES ($username, $email, $password)`,
      {
        bind: {
          username: username,
          email: email,
          password: hashPassword,
        },
      }
    );
  }

  return res.status(201).json({
    message: 'Successfully registered. You can now log in.'
  })
};
