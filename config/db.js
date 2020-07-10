const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const db = new Sequelize('uptask', 'cmorales', 'oUjBb9Zdypc9KfPe6Pzp', {
    host: 'localhost',
    dialect: 'mysql',
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