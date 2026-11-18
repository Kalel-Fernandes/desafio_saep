const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { criptografar, descriptografar } = require('../utils/crypto');

const Tutor = sequelize.define('Tutor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  cpf: {
    type: DataTypes.STRING(255),
    allowNull: false,
    // grava sempre criptografado
    set(valor) {
      this.setDataValue('cpf', criptografar(valor));
    },
    // devolve descriptografado ao ler
    get() {
      const valor = this.getDataValue('cpf');
      return valor ? descriptografar(valor) : null;
    },
  },
  telefone: { type: DataTypes.STRING(20), allowNull: false },
  email: { type: DataTypes.STRING(120) },
  endereco: { type: DataTypes.STRING(200) },
}, {
  tableName: 'tutores',
  createdAt: 'criado_em',
  updatedAt: false,
});

module.exports = Tutor;