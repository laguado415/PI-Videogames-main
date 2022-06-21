require("dotenv").config(); //averiguar como se usa .env
const { API_KEY } = process.env;
const axios = require("axios");
const { Genre } = require("../db");

module.exports = {
  getAll: async (req, res) => {
    try {
      let validate = await Genre.findAll();
      if (validate.length) {
        return res.json(validate);
      }
      let { data } = await axios(`https://api.rawg.io/api/genres${API_KEY}`);
      data = data.results.map((genre) => {
        return {
          name: genre.name,
          image: genre.image_background,
        };
      });
    
      return res.json(await Genre.bulkCreate(data));
    } catch (err) {
      return res.json(err);
    }
  },
};
