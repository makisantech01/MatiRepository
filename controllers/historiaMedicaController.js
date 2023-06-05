const HistoriaMedica = require('../models/HistoriaMedica');

// Obtener todas las historias médicas
exports.getAllHistoriasMedicas = async (req, res) => {
  try {
    const historiasMedicas = await HistoriaMedica.findAll();
    res.json(historiasMedicas);
  } catch (error) {
    console.error('Error al obtener las historias médicas:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener las historias médicas' });
  }
};

// Obtener una historia médica por su ID
exports.getHistoriaMedicaById = async (req, res) => {
  const { id } = req.params;
  try {
    const historiaMedica = await HistoriaMedica.findByPk(id);
    if (!historiaMedica) {
      return res.status(404).json({ error: 'Historia médica no encontrada' });
    }
    res.json(historiaMedica);
  } catch (error) {
    console.error('Error al obtener la historia médica:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener la historia médica' });
  }
};

// Crear una nueva historia médica
exports.createHistoriaMedica = async (req, res) => {
  const { pacienteId, fecha, enfermedad, descripcion } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!pacienteId || !fecha || !enfermedad || !descripcion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Crear la historia médica en la base de datos
    const historiaMedica = await HistoriaMedica.create({ pacienteId, fecha, enfermedad, descripcion });

    res.status(201).json(historiaMedica);
  } catch (error) {
    console.error('Error al crear la historia médica:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear la historia médica' });
  }
};

// Actualizar una historia médica por su ID
exports.updateHistoriaMedica = async (req, res) => {
  const { id } = req.params;
  const { pacienteId, fecha, enfermedad, descripcion } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!pacienteId || !fecha || !enfermedad || !descripcion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Buscar la historia médica en la base de datos y actualizarla
    const historiaMedica = await HistoriaMedica.findByPk(id);
    if (!historiaMedica) {
      return res.status(404).json({ error: 'Historia médica no encontrada' });
    }

    historiaMedica.pacienteId = pacienteId;
    historiaMedica.fecha = fecha;
    historiaMedica.enfermedad = enfermedad;
    historiaMedica.descripcion = descripcion;
    await historiaMedica.save();

    res.json(historiaMedica);
  } catch (error) {
    console.error('Error al actualizar la historia médica:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar la historia médica' });
  }
};

// Eliminar una historia médica por su ID
exports.deleteHistoriaMedica = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar la historia médica en la base de datos y eliminarla
    const historiaMedica = await HistoriaMedica.findByPk(id);
    if (!historiaMedica) {
      return res.status(404).json({ error: 'Historia médica no encontrada' });
    }

    await historiaMedica.destroy();

    res.json({ message: 'Historia médica eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la historia médica:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar la historia médica' });
  }
};
