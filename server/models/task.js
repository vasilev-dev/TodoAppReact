const { DataTypes} = require('sequelize');

function taskInit(sequelize) {
    return sequelize.define('Task', {
        label: {
            type: DataTypes.STRING,
            allowNull: false
        },
        important: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {});
}

module.exports = taskInit;
