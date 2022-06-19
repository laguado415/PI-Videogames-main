const express = require("express");
const app = express.Router();
const controller = require("../controllers/genre");

app.get("/", controller.getAll);

module.exports = app;
