require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op, Videogame, Genre, conn: sequelize } = require("../db");

const formatGame = async (collection) => {
  try {
    let request = await axios(`https://api.rawg.io/api/games${API_KEY}`);
    request = request.data;
    while (request.next && collection.length < 5) {
      collection.push(
        request.results.map((game) => {
          return {
            name: game.name,
            platforms: { ...game.platforms },
            rating: game.rating,
            ratings: { ...game.ratings },
            image: game.background_image,
            released: game.released,
            description: `https://api.rawg.io/api/games/${game.id}${API_KEY}`,
            genre: game.genres.map((genre) => genre.name),
            default: true,
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
      let {
        name,
        size: sizeQuery,
        page: pageQuery,
        column: columnQuery,
        order: orderQuery,
      } = req.query;
      //--------------paginacion----------------------
      let size = sizeQuery ? sizeQuery : 15;
      let page = pageQuery ? pageQuery * size : 0;
      //--------------order basic--------------------
      let column = !columnQuery ? "name" : `${columnQuery}`;
      let order = orderQuery && `${orderQuery}`;
      let macth = !orderQuery ? [`${column}`] : [`${column}`, `${order}`];
      if (name) {
        let search = await Videogame.findAndCountAll({
          order: [macth],
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          limit: size,
          offset: page,
        });
        if (!search.count) {
          throw new Error("no se encontraron games");
        }
        return res.json(search);
      }
      //---------------------- / -----------------------------

      let games = await Videogame.findAndCountAll({
        order: [macth],
        limit: size,
        offset: page,
      });

      if (games.count) {
        return res.json(games);
      }

      games = [];
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
