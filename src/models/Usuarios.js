const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
  senha: { type: DataTypes.STRING(255), allowNull: false },
}, {
  tableName: 'usuarios',
  createdAt: 'criado_em',
  updatedAt: false,
});

module.exports = Usuario;