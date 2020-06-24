const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const db = new Sequelize('uptask', 'root', '1023Mora', {
    host: 'localhost',
    dialect: 'mariadb',
    port: '3306',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;