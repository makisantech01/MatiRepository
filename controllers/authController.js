const jwt = require('jsonwebtoken');
const Paciente = require('../models/Paciente');

// Autenticación del paciente por nombre y DNI
exports.authenticatePaciente = async (req, res) => {
  const { dni, nombre } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!dni || !nombre) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Verificar si el paciente existe en la base de datos
    const paciente = await Paciente.findOne({ where: { dni, nombre } });
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    // Generar el token de autenticación
    const token = jwt.sign({ pacienteId: paciente.id }, 'secret_key');

    res.json({ token });
  } catch (error) {
    console.error('Error al autenticar al paciente:', error);
    res.status(500).json({ error: 'Ocurrió un error al autenticar al paciente' });
  }
};

// Obtener el perfil del paciente autenticado
exports.getProfilePaciente = async (req, res) => {
  const pacienteId = req.pacienteId;

  try {
    // Obtener el perfil del paciente desde la base de datos
    const paciente = await Paciente.findByPk(pacienteId);
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.json(paciente);
  } catch (error) {
    console.error('Error al obtener el perfil del paciente:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el perfil del paciente' });
  }
};

// Registro de un nuevo paciente
exports.registerPaciente = async (req, res) => {
    const { dni, nombre, edad, email, direccion, telefono } = req.body;
  
    try {
      // Verificar si los campos requeridos están presentes
      if (!dni || !nombre || !edad || !email || !direccion || !telefono) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
  
      // Verificar si el paciente ya está registrado
      const existingPaciente = await Paciente.findOne({ where: { dni } });
      if (existingPaciente) {
        return res.status(409).json({ error: 'El paciente ya está registrado' });
      }
  
      // Crear el paciente en la base de datos
      const paciente = await Paciente.create({ dni, nombre, edad, email, direccion, telefono });
  
      // Generar el token de autenticación
      const token = jwt.sign({ pacienteId: paciente.id }, 'secret_key');
  
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error al registrar al paciente:', error);
      res.status(500).json({ error: 'Ocurrió un error al registrar al paciente' });
    }
  };


  // Cierre de sesión
exports.logout = (req, res) => {
    try {
      // Eliminar la información de sesión del paciente
      req.session.destroy();
  
      // Redirigir al paciente a la página de inicio de sesión
      res.redirect('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      res.status(500).json({ error: 'Ocurrió un error al cerrar sesión' });
    }
  };