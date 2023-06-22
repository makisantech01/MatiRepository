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

Cita.associate = (models) => {
  Cita.belongsTo(models.Dentista, { foreignKey: 'dentistaId' });
  Cita.belongsTo(models.Paciente, { foreignKey: 'pacienteId' });
};

Cita.beforeCreate(async (cita) => {
  const paciente = await cita.getPaciente();
  if (!paciente || !paciente.nombre || !paciente.dni) {
    throw new Error('Autenticación requerida para reservar una cita');
  }
});

module.exports = Cita;
