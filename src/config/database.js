const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('saep_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;