const { Sequelize } = require('sequelize');
const taskInit = require('./task');

const sequelize = new Sequelize('todolist', 'root', 'dima123', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});

const Task = taskInit(sequelize);

module.exports = {
    sequelize,
    Task
}
