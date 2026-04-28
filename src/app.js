const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Require all the routes here */
const authRouter = require("./routes/auth.routes");

/* Use all the routes here */
app.use("/api/auth", authRouter);

module.exports = app;
