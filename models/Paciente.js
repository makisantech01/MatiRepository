const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Paciente = sequelize.define('Paciente', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  obraSocial: {
    type: DataTypes.ENUM,
    values: ["Particular", "OSDE", "Medifé", "Swiss Medical", "GALENO"],
  }
});

Paciente.associate = (models) => {
  Paciente.hasMany(models.Cita, { foreignKey: 'pacienteId' });
  Paciente.hasMany(models.HistoriaMedica, { foreignKey: 'pacienteId' });
};

module.exports = Paciente;
