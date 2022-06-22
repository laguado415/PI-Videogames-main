const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "genre_game",
    {
      genres: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
