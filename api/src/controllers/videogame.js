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

      if (find || filter) {
        throw new Error("no se encontraron games");
      }

      throw new Error("Data Base vacia");
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
      return res.json(await repoVideoGame.findById(id));
    } catch (err) {
      return res.status(404).json(err.message);
    }
  },
};
