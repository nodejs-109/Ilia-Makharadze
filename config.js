// config.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testdb', 'postgres', 'ilia', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
