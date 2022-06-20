require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op, Videogame } = require("../db");

const formatGame = async (collection) => {
  try {
    let request = await axios(`https://api.rawg.io/api/games${API_KEY}`);
    request = request.data;
    while (request.next && collection.length < 24) {
      collection.push(
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
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAll: async (req, res) => {
    // videogames/query o videogames/
    try {
      //--------------------query-----------------------------
      let { name } = req.query;
      if (name) {
        let search = await Videogame.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        });
        if (!search.length) {
          throw new Error("no se encontraron games");
        }
        return res.json(search);
      }
      //---------------------- / -----------------------------
      let games = await Videogame.findAll();
      if (games.length) {
        return res.json(games);
      }

      await formatGame(games);

      for (gamesCollection of games) {
        await Videogame.bulkCreate(gamesCollection);
      }
      return res.end();
    } catch (err) {
      return res.status(404).json(err.message);
    }
  },
  getId: async (req, res) => {
    try {
      let { id } = req.params;
      if (!id) {
        throw new Error("id requerido");
      }
      let videogame = await Videogame.findByPk(id);
      if (!videogame) {
        throw new Error("videogame no encontrado");
      }
      return res.json(videogame);
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  },
};
