const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Dentista = sequelize.define('Dentista', { 
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Dentista.associate = (models) => {
  Dentista.hasMany(models.Cita, { foreignKey: 'dentistaId' });
};

module.exports = Dentista;
