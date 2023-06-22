const Paciente = require('../models/Paciente');

// Obtener todos los pacientes
exports.getAllPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
  } catch (error) {
    console.error('Error al obtener los pacientes:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los pacientes' });
  }
};

// Obtener un paciente por su ID
exports.getPacienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    res.json(paciente);
  } catch (error) {
    console.error('Error al obtener el paciente:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el paciente' });
  }
};

// Crear un nuevo paciente
exports.createPaciente = async (req, res) => {
  const { nombre, edad, email, direccion, telefono, dni, obraSocial } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!nombre || !edad || !email || !direccion || !telefono || !dni || !obraSocial) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
  
    // Crear el paciente en la base de datos
    const paciente = await Paciente.create({ nombre, edad, email, direccion, telefono, dni, obraSocial });
  
    res.status(201).json(paciente);
  } catch (error) {
    console.error('Error al crear el paciente:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear el paciente' });
  }  
};


// Actualizar un paciente por su ID
exports.updatePaciente = async (req, res) => {
  const { id } = req.params;
  const { nombre, edad, email, direccion, telefono, obraSocial } = req.body;
  
  try {
    // Verificar si los campos requeridos están presentes
    if (!nombre || !edad || !email || !direccion || !telefono || !obraSocial) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
  
    // Buscar el paciente en la base de datos y actualizarlo
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
  
    paciente.nombre = nombre;
    paciente.edad = edad;
    paciente.email = email;
    paciente.direccion = direccion;
    paciente.telefono = telefono;
    paciente.obraSocial = obraSocial; // Agregar esta línea para actualizar el campo obraSocial
    await paciente.save();
  
    res.json(paciente);
  } catch (error) {
    console.error('Error al actualizar el paciente:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar el paciente' });
  }
  
};

// Eliminar un paciente por su ID
exports.deletePaciente = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el paciente en la base de datos y eliminarlo
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    await paciente.destroy();

    res.json({ message: 'Paciente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el paciente:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el paciente' });
  }
};
