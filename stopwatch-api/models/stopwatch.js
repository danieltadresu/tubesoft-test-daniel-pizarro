const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Stopwatch = sequelize.define("stopwatch", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
  time: {
    type: Sequelize.STRING,
  },
});

module.exports = Stopwatch;
