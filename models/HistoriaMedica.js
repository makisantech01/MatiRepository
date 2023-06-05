const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const HistoriaMedica = sequelize.define('HistoriaMedica', {
  pacienteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  enfermedad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = HistoriaMedica;
