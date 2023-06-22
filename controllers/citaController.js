const Cita = require('../models/Cita');

// Obtener todas las citas
exports.getAllCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll();
    res.json(citas);
  } catch (error) {
    console.error('Error al obtener las citas:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener las citas' });
  }
};

// Obtener una cita por su ID
exports.getCitaById = async (req, res) => {
  const { id } = req.params;
  try {
    const cita = await Cita.findByPk(id);
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }
    res.json(cita);
  } catch (error) {
    console.error('Error al obtener la cita:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener la cita' });
  }
};

// Crear una nueva cita
exports.createCita = async (req, res) => {
  const { pacienteId, dentistaId, tratamientoId, fecha, hora, duracion, estado } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!pacienteId || !dentistaId || !tratamientoId || !fecha || !hora || !duracion || !estado) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Crear la cita en la base de datos
    const cita = await Cita.create({ pacienteId, dentistaId, tratamientoId, fecha, hora, duracion, estado });

    res.status(201).json(cita);
  } catch (error) {
    console.error('Error al crear la cita:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear la cita' });
  }
};


// Actualizar una cita por su ID
exports.updateCita = async (req, res) => {
  const { id } = req.params;
  const { pacienteId, dentistaId, tratamientoId, fecha, hora, duracion, estado } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!pacienteId || !dentistaId || !tratamientoId || !fecha || !hora || !duracion || !estado) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Buscar la cita en la base de datos y actualizarla
    const cita = await Cita.findByPk(id);
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    cita.pacienteId = pacienteId;
    cita.dentistaId = dentistaId;
    cita.tratamientoId = tratamientoId;
    cita.fecha = fecha;
    cita.hora = hora;
    cita.duracion = duracion;
    cita.estado = estado;
    await cita.save();

    res.json(cita);
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar la cita' });
  }
};

// Eliminar una cita por su ID
exports.deleteCita = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar la cita en la base de datos y eliminarla
    const cita = await Cita.findByPk(id);
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    await cita.destroy();

    res.json({ message: 'Cita eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la cita:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar la cita' });
  }
};
