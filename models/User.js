const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importăm conexiunea la baza de date

// Definirea modelului User
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['student', 'professor']], // Doar valorile "student" sau "professor"
    },
  },
});

module.exports = User;
