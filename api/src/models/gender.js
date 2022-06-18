const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("gender", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    }
  });
};
