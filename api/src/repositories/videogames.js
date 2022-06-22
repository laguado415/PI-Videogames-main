require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op, conn: sequelize, Videogame, Genre } = require("../db");

//---------------------add collection de RAWG----------
const formatGame = async () => {
  try {
    const collection = [];
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
          };
        })
      );
      request = await axios(request.next);
      request = request.data;
    }
    for (gamesCollection of collection) {
      await Videogame.bulkCreate(gamesCollection);
    }
    await addCollectionGenre();
  } catch (err) {
    throw err;
  }
};

//--------------------add collection de genre_games-------
const addCollectionGenre = async () => {
  let collection = await Videogame.findAll();
  for (let game of collection) {
    for (let genre of game.genre) {
      // console.log(genre);
      let instanceGenre = await Genre.findAll({
        where: {
          name: `${genre}`,
        },
      });
      game.addGenre(instanceGenre, { through: { genres: `${genre}` } });
    }
  }
};

const findAndCountAll = async ({
  find,
  filter,
  order: options,
  size: limit,
  page: offset,
}) => {
  let where = {};
  let order = [];
  let attributes = {};

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
        order = [[options.column ? options.column : "name", options.direction]];
      }
    }
  }
  if (find) {
    find = Object.entries(find);
    for (let [key, value] of find) {
      where[key] = { [Op.iLike]: `%${value}%` };
    }
  }
  if (filter) {
    if (filter.hasOwnProperty("added") && !Array.isArray(filter.added)) {
      where.added = filter.added;
    }
    // if (filter.hasOwnProperty("genre")) {
    //   where.genres = { [Op.or]: [filter.genre] };
    // }
  }
  return Videogame.findAndCountAll({
    attributes,
    order,
    where,
    limit,
    offset,
  });
};

module.exports = {
  formatGame,
  addCollectionGenre,
  findAndCountAll,
};
