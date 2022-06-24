const repoGenre = require("../repositories/genres");

module.exports = {
  getAll: async (req, res) => {
    try {
      return res.json(await repoGenre.findAll());
    } catch (err) {
      return res.status(404).json(err.message);
    }
  },
};
