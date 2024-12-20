require('dotenv').config();
const { Sequelize } = require('sequelize');

// Configurarea Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Numele bazei de date
  process.env.DB_USER,       // Utilizatorul bazei de date
  process.env.DB_PASSWORD,   // Parola bazei de date
  {
    host: process.env.DB_HOST, // Host-ul bazei de date
    dialect: process.env.DB_DIALECT, // Dialectul bazei de date (MySQL)
    logging: false, // Dezactivează log-urile Sequelize (opțional)
  }
);

module.exports = sequelize;
