require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op, conn: sequelize, Videogame, Genre } = require("../db");
const { generatorGenre } = require("../repositories/genres");

//---------------------add collection de RAWG----------
const formatGame = async () => {
  try {
    let collection = [];
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
            genreJson: game.genres.map((genre) => genre.name),
          };
        })
      );
      request = await axios(request.next);
      request = request.data;
    }

    collection = collection.flat();

    await Videogame.bulkCreate(collection);

    await generatorGenre();
    await addCollectionGenre();
  } catch (err) {
    throw err.message;
  }
};

//--------------------add collection de genre_games-------
const addCollectionGenre = async () => {
  try {
    let collection = await Videogame.findAll();
    for (let game of collection) {
      let genre = await Genre.findAll({
        where: {
          name: game.genreJson,
        },
      });
      await game.addGenres(genre);
    }
  } catch (err) {
    throw new Error("error al adicionar generos");
  }
};

//-----find all iinclude filter, order. etc
const findAndCountAll = async ({
  find,
  filter,
  order: options,
  size: limit,
  page: offset,
}) => {
  try {
    let where = {};
    let order = [];
    let attributes = {};
    let include = { model: Genre };

    if (options) {
      let validate = Object.keys(options);
      //------------repetidos-------------------------
      function recurrent(value, index, array) {
        return array.indexOf(value) === index;
      }
      if (validate.length <= 2 && validate.some(recurrent)) {
        if (!options.direction) {
          order = [[options.column ? options.column : "name"]];
        } else {
          order = [
            [options.column ? options.column : "name", options.direction],
          ];
        }
      }
    }
    if (find) {
      //refactorizar
      find = Object.entries(find);
      for (let [key, value] of find) {
        where[key] = { [Op.iLike]: `%${value}%` };
      }
    }
    if (filter) {
      if (filter.hasOwnProperty("added") && !Array.isArray(filter.added)) {
        where.added = filter.added;
      }
      //Eager loading
      if (filter.hasOwnProperty("genre")) {
        let { genre } = filter;
        if (!Array.isArray(genre)) {
          genre = [genre];
        }
        include.where = {
          name: {
            [Op.or]: genre,
          },
        };
      }
    }

    let query = await Videogame.findAndCountAll({
      attributes,
      order,
      include,
      where,
      limit,
      offset,
    });

    let g = await Videogame.findAll({
      attributes,
      order,
      include,
      where,
    });

    query.count = g.length;

    return query;
  } catch (err) {
    throw new Error("No se pudo realizar la busqueda");
  }
};

const findById = async (id) => {
  try {
    let videogame = await Videogame.findByPk(id, {
      include: [
        {
          model: Genre,
        },
      ],
    });
    if (!videogame) {
      throw new Error("videogame no encontrado");
    }
    return videogame;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  formatGame,
  addCollectionGenre,
  findAndCountAll,
  findById,
};