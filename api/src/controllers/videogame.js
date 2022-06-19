require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op, Videogame } = require("../db");

module.exports = {
  getAll: async (req, res) => {
    try {
      let videoGames = await Videogame.findAll();
      if (videoGames.length) {
        return res.json(videoGames);
      }
      let request = await axios(`https://api.rawg.io/api/games${API_KEY}`);
      request = request.data;

      while (request.next && videoGames.length < 25) {
        videoGames.push(
          request.results.map((game) => {
            return {
              name: game.name,
              platforms: { ...game.platforms },
              rating: { ...game.ratings },
              image: game.background_image,
              released: game.released,
              description: `https://api.rawg.io/api/games/${game.id}${API_KEY}`,
            };
          })
        );
        request = await axios(request.next);
        request = request.data;
      }

      for (games of videoGames) {
        await Videogame.bulkCreate(games);
      }
      return res.json(await Videogame.findAll());
    } catch (err) {
      return res.json(err);
    }
  },
};
