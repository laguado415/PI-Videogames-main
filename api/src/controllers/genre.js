const repoGenre = require("../repositories/genres");
const { Genre } = require("../db");

module.exports = {
  getAll: async (req, res) => {
    try {
      let validate = await Genre.findAll();
      if (validate.length) {
        return res.json(validate);
      }
      // res.json(await generatorGenre());
      res.end();
    } catch (err) {
      return res.json(err);
    }
  },
};
