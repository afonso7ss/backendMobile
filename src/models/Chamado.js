const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./User');

const Chamado = sequelize.define('Chamado', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  categoria: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  local: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Status padrão é 'false'
  },
}, {
  tableName: 'chamados',
  timestamps: false,
});

Chamado.belongsTo(User, { as: 'usuario', foreignKey: 'userId' }); // Criador do chamado
Chamado.belongsTo(User, { as: 'funcionario', foreignKey: 'funcionarioId' }); // Funcionário que finalizou


module.exports = Chamado;
