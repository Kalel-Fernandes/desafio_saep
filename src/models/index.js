const sequelize = require('../config/database');
const Usuario = require('./Usuarios');
const Tutor = require('./Tutor');
const Pet = require('./Pet');
const Agendamento = require('./Agendamentos');

Tutor.hasMany(Pet, { foreignKey: 'tutor_id', as: 'pets' });
Pet.belongsTo(Tutor, { foreignKey: 'tutor_id', as: 'tutor' });

Pet.hasMany(Agendamento, { foreignKey: 'pet_id', as: 'agendamentos' });
Agendamento.belongsTo(Pet, { foreignKey: 'pet_id', as: 'pet' });

Usuario.hasMany(Agendamento, { foreignKey: 'usuario_id', as: 'agendamentos' });
Agendamento.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

module.exports = { sequelize, Usuario, Tutor, Pet, Agendamento };