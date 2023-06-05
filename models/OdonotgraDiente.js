const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Diente = sequelize.define('Diente', { 
  numero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Odontograma = sequelize.define('Odontograma', { 
  paciente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

Odontograma.hasMany(Diente, { as: 'dientes' });

module.exports = { Odontograma, Diente };
