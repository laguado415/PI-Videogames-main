require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const videogame = require("../controllers/videogame");
const { Op, conn: sequelize, Videogame, Genre } = require("../db");
const { generatorGenre } = require("../repositories/genres");

//---------------------add collection de RAWG----------
const formatGame = async () => {
  try {
    let collection = [];
    let request = await axios(`https://api.rawg.io/api/games${API_KEY}`);
    request = request.data;
    // let i = 0;
    while (request.next && collection.length < 10) {
      let games = [];
      for (let game of request.results) {
        // game = await axios(
        //   `https://api.rawg.io/api/games/${game.id}${API_KEY}`
        // );
        // game = game.data;
        games.push({
          name: game.name,
          platforms: game.parent_platforms.map((game) => game.platform.name),
          rating: game.rating,
          ratings: { ...game.ratings },
          image: game.background_image,
          released: game.released,
          description: `https://api.rawg.io/api/games/${game.id}${API_KEY}`,
          genreJson: game.genres.map((genre) => genre.name),
        });
      }
      collection.push(games);
      console.log(collection.length);
      request = await axios(request.next);
      request = request.data;
      console.log(!request.next);
    }
    //para no recorrer 5 posiciones si no pasar una vez el metodo bulkCreate()
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
      //mixins pasa array [generes]
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

    //me cunta el numero de videojuegos  mas no el numero de registros
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

//-------find By ID--------------------------------------
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

    if (!videogame.added) {
      let { data } = await axios(videogame.description);
      videogame.description = data.description_raw;
    }

    return videogame;
  } catch (err) {
    throw err;
  }
};

//-------post game ---------------------------
const addGame = async (data) => {
  try {
    let { name, description, image, released, rating, genres, platforms } =
      data;
    if (!name || !description || !genres || !platforms) {
      throw new Error("Missing data for the request");
    }

    let find = await Videogame.findOne({
      where: {
        name: name,
      },
    });

    if (find) {
      throw new Error("The game already exists");
    }

    await Videogame.create({
      name,
      description,
      image,
      released,
      rating,
      platforms,
      added: true,
    })
      .then((game) => game.addGenres(genres))
      .catch(() => {
        throw new Error("The game could not be added");
      });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  formatGame,
  addCollectionGenre,
  findAndCountAll,
  findById,
  addGame,
};
