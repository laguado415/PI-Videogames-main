/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const server = require("../../src/app.js");
const app = require("../../src/app.js");
const { Videogame, conn, Genre } = require("../../src/db.js");

const agent = session(app);

const genre = async () => {
  let genre = await Genre.findOne({
    where: {
      name: "Action",
    },
  });
  return genre.id;
};

const videogame = [
  {
    name: "Super Mario Bros",
    rating: 4.1,
    released: "04/02/2010",
    description: "juego para ninos",
    platforms: ["Nintendo"],
  },
  {
    name: "Sorz",
    rating: 3.2,
    released: "08/24/2001",
    description: "juego para ninos",
    platforms: ["Nintendo,Xbox"],
  },
  {
    name: "Mario kart",
    rating: 2.0,
    released: "04/25/1998",
    description: "juego para ninos",
    platforms: ["PC"],
  },
  {
    name: "PES",
    rating: 4.8,
    released: "02/02/1963",
    description: "juego para ninos",
    platforms: ["Nintendo,PC"],
  },
];

const videogameReplica = {
  name: "Super Mario Bros",
  rating: 4.1,
  released: "04/02/2010",
  description: "juego para ninos",
  platforms: ["Nintendo"],
};

const newVideogame = {
  name: "Super",
  rating: 4.1,
  released: "04/02/2010",
  description: "juego para ninos",
  platforms: ["Nintendo"],
};

describe("Videogame routes", () => {
  before(async () => {
    try {
      await conn.authenticate();
    } catch (err) {
      console.error("Unable to connect to the database:", err);
    }
  });
  beforeEach(() =>
    Videogame.sync({ force: true }).then(() => Videogame.bulkCreate(videogame))
  );
  describe("GET /videogames", () => {
    it("should get 200", () => agent.get("/videogames").expect(200));
  });
  describe("POST /videogames", () => {
    it("should post 404", () =>
      agent.post("/videogames").send(videogameReplica).expect(404));
    beforeEach(() => {
      genre().then((res) => (newVideogame.genres = [`${res}`]));
    });
    it("should post 200", () =>
      agent.post("/videogames").send(newVideogame).expect(200));
  });
  describe("GET /genres", () => {
    it("should get 200", () => {
      agent.get("/genres").expect(200);
    });
  });
});
