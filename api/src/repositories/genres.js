require("dotenv").config(); //averiguar como se usa .env
const { API_KEY } = process.env;
const axios = require("axios");
const { Genre } = require("../db");

const generatorGenre = async () => {
  try {
    let { data } = await axios(`https://api.rawg.io/api/genres${API_KEY}`);
    data = data.results.map((genre) => {
      return {
        name: genre.name,
        image: genre.image_background,
      };
    });

    await Genre.bulkCreate(data);
  } catch (err) {
    throw new Error("error adding genres to intermediate table");
  }
};

const findAll = async () => {
  try {
    let validate = await Genre.findAll();
    if (validate.length) {
      return validate;
    }
    throw new Error("Database Genres empty");
  } catch (err) {
    throw err;
  }
};

module.exports = {
  generatorGenre,
  findAll,
};
