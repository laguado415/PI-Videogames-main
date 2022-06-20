const express = require("express");
const app = express.Router();
const controller = require("../controllers/videogame");

app.get("/", controller.getAll);
app.get("/:id", controller.getId);
module.exports = app;
