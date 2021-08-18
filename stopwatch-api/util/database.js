const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'postgres',
  dialect: 'postgres'
});

module.exports = sequelize;