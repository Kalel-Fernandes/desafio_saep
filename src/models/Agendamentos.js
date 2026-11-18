const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Agendamento = sequelize.define('Agendamento', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  data_agendamento: { type: DataTypes.DATE, allowNull: false },
  motivo: { type: DataTypes.STRING(200), allowNull: false },
  status: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'Agendado' },
  pet_id: { type: DataTypes.INTEGER, allowNull: false },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'agendamentos',
  timestamps: false,
});

module.exports = Agendamento;