const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Cita = sequelize.define('Cita', { 
  pacienteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dentistaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tratamientoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Cita;
