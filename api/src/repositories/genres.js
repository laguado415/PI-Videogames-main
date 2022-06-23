require("dotenv").config(); //averiguar como se usa .env
const { API_KEY } = process.env;
const axios = require("axios");
const { Genre } = require("../db");

const generatorGenre = async () => {
  let { data } = await axios(`https://api.rawg.io/api/genres${API_KEY}`);
  data = data.results.map((genre) => {
    return {
      name: genre.name,
      image: genre.image_background,
    };
  });

  return await Genre.bulkCreate(data);
};

module.exports = {
  generatorGenre,
};
