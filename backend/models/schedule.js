const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Schedule = sequelize.define('Schedule', {
    trainId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    departureTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    routeDetails: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'schedules',
    timestamps: false
});

module.exports = Schedule;