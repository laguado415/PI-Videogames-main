const { Router } = require("express");
const routeGames = require("./videogame");
const routeGenres = require("./genre");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", routeGames);
router.use("/genres", routeGenres);

module.exports = router;
