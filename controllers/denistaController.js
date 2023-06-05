const Dentista = require('../models/Dentista');

// Obtener todos los dentistas
exports.getAllDentistas = async (req, res) => {
  try {
    const dentistas = await Dentista.findAll();
    res.json(dentistas);
  } catch (error) {
    console.error('Error al obtener los dentistas:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los dentistas' });
  }
};

// Obtener un dentista por su ID
exports.getDentistaById = async (req, res) => {
  const { id } = req.params;
  try {
    const dentista = await Dentista.findByPk(id);
    if (!dentista) {
      return res.status(404).json({ error: 'Dentista no encontrado' });
    }
    res.json(dentista);
  } catch (error) {
    console.error('Error al obtener el dentista:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el dentista' });
  }
};

// Crear un nuevo dentista
exports.createDentista = async (req, res) => {
  const { nombre, especialidad, email, telefono } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!nombre || !especialidad || !email || !telefono) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Crear el dentista en la base de datos
    const dentista = await Dentista.create({ nombre, especialidad, email, telefono });

    res.status(201).json(dentista);
  } catch (error) {
    console.error('Error al crear el dentista:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear el dentista' });
  }
};

// Actualizar un dentista por su ID
exports.updateDentista = async (req, res) => {
  const { id } = req.params;
  const { nombre, especialidad, email, telefono } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!nombre || !especialidad || !email || !telefono) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Buscar el dentista en la base de datos y actualizarlo
    const dentista = await Dentista.findByPk(id);
    if (!dentista) {
      return res.status(404).json({ error: 'Dentista no encontrado' });
    }

    dentista.nombre = nombre;
    dentista.especialidad = especialidad;
    dentista.email = email;
    dentista.telefono = telefono;
    await dentista.save();

    res.json(dentista);
  } catch (error) {
    console.error('Error al actualizar el dentista:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar el dentista' });
  }
};

// Eliminar un dentista por su ID
exports.deleteDentista = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el dentista en la base de datos y eliminarlo
    const dentista = await Dentista.findByPk(id);
    if (!dentista) {
      return res.status(404).json({ error: 'Dentista no encontrado' });
    }

    await dentista.destroy();

    res.json({ message: 'Dentista eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el dentista:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el dentista' });
  }
};
