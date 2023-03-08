require("dotenv").config();
const express = require("express");
const { sequelize } = require("./database/config.js");
const apiRoutes = require("./routes");

const cors = require("cors");
const xss = require("xss-clean");
const { rateLimit } = require("express-rate-limit");
const { default: helmet } = require("helmet");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});

app.use(xss());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());

app.use(
  cors({
    methods: ["GET", "PUT", "PATCH", "DELETE", "POST"],
  })
);

app.use("/api/v1", apiRoutes);

const port = process.env.PORT || 3000;
const run = async () => {
  try {
    await sequelize.authenticate();

    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

run();
