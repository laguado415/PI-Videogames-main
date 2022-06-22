const { Videogame } = require("../db");
const repoVideoGame = require("../repositories/videogames");

module.exports = {
  getAll: async (req, res) => {
    // videogames/query o videogames/
    try {
      //--------------------query-----------------------------
      let { find, size: sizeQuery, page: pageQuery, order, filter } = req.query;
      //--------------paginacion----------------------
      let size = sizeQuery ? sizeQuery : 15;
      let page = pageQuery ? pageQuery * size : 0;
      //---------------------- / -----------------------------
      let games = await repoVideoGame.findAndCountAll({
        filter, //[added] o [genre]=idGenre
        find, //[columna o propiedad]=search
        order, //[direction] o [column]
        size,
        page,
      });

      if (games.count) {
        return res.json(games);
      }

      if (find) {
        throw new Error("no se encontraron games");
      }

      await repoVideoGame.formatGame();
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

      // _isAttribute: [Function (anonymous)],
      // getGenres: [Function (anonymous)],
      // countGenres: [Function (anonymous)],
      // hasGenre: [Function (anonymous)],
      // hasGenres: [Function (anonymous)],
      // setGenres: [Function (anonymous)],
      // addGenre: [Function (anonymous)],
      // addGenres: [Function (anonymous)],
      // removeGenre: [Function (anonymous)],
      // removeGenres: [Function (anonymous)],
      // createGenre: [Function (anonymous)]

      return res.json(videogame);
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  },
};
