const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pet = sequelize.define('Pet', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(80), allowNull: false },
  especie: { type: DataTypes.STRING(40), allowNull: false },
  raca: { type: DataTypes.STRING(60) },
  data_nascimento: { type: DataTypes.DATEONLY },
  tutor_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'pets',
  timestamps: false,
});

module.exports = Pet;