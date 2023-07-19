const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Diente = sequelize.define('Diente', {
  numero: {
    type: DataTypes.NUMBER,
    allowNull: false,
    unique: true
  },
  posicionX: { type: Number, required: true },
  posicionY: { type: Number, required: true },
  caras: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {
      vestibular: null,
      lingual: null,
      oclusal: null,
      incisal: null,
      mesial: null,
      distal: null,
      cervical: null
    }
  },
  todoElDiente: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },
  observacion: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
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
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  }
  // materialesUsados: {
  //   type: DataTypes.STRING,
  //   allowNull: true
  // }
});

Odontograma.hasMany(Diente, { as: 'dientes' });

module.exports = { Odontograma, Diente };
