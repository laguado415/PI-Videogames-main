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
        throw new Error("games not found");
      }

      throw new Error("Database empty");
    } catch (err) {
      return res.status(404).json(err.message);
    }
  },
  getId: async (req, res) => {
    try {
      let { id } = req.params;
      if (!id) {
        throw new Error("id required");
      }
      return res.json(await repoVideoGame.findById(id));
    } catch (err) {
      return res.status(404).json(err.message);
    }
  },
  postGame: async (req, res) => {
    try {
      if (!Object.entries(req.body).length) {
        throw new Error("data is required to add game please provide them");
      }
      let data = {
        name: "",
        description: "",
        image: "",
        released: "",
        rating: "",
        genres: "",
        platforms: "",
      };
      await repoVideoGame.addGame({ ...data, ...req.body });
      return res.json("Game added successfully");
    } catch (err) {
      return res.status(404).json(err.message);
    }
  },
};
