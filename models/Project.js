const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/User');

const Project = sequelize.define("Project", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    }
});

module.exports = Project;