const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('registrationdb', 'postgres', 'ilia', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
