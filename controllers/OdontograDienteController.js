const Diente = require('../models/OdontograDiente');

// Obtener todos los dientes del odontograma
exports.getAllDientes = async (req, res) => {
  try {
    const dientes = await Diente.findAll();
    res.json(dientes);
  } catch (error) {
    console.error('Error al obtener los dientes del odontograma:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los dientes del odontograma' });
  }
};

// Obtener un diente por su ID
exports.getDienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const diente = await Diente.findByPk(id);
    if (!diente) {
      return res.status(404).json({ error: 'Diente no encontrado' });
    }
    res.json(diente);
  } catch (error) {
    console.error('Error al obtener el diente:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el diente' });
  }
};

// Crear un nuevo diente
exports.createDiente = async (req, res) => {
  const { numero, caras, todoElDiente, observacion } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!numero || !caras || !todoElDiente || !observacion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Crear el diente en la base de datos
    const diente = await Diente.create({ numero, caras, todoElDiente, observacion });

    res.status(201).json(diente);
  } catch (error) {
    console.error('Error al crear el diente:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear el diente' });
  }
};


// Actualizar un diente por su ID
exports.updateDiente = async (req, res) => {
  const { id } = req.params;
  const { numero, caras, todoElDiente, observacion } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!numero || !caras || !todoElDiente || !observacion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Buscar el diente en la base de datos y actualizarlo
    const diente = await Diente.findByPk(id);
    if (!diente) {
      return res.status(404).json({ error: 'Diente no encontrado' });
    }

    diente.numero = numero;
    diente.caras = caras;
    diente.todoElDiente = todoElDiente;
    diente.observacion = observacion;
    await diente.save();

    res.json(diente);
  } catch (error) {
    console.error('Error al actualizar el diente:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar el diente' });
  }
};

// Eliminar un diente por su ID
exports.deleteDiente = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el diente en la base de datos y eliminarlo
    const diente = await Diente.findByPk(id);
    if (!diente) {
      return res.status(404).json({ error: 'Diente no encontrado' });
    }

    await diente.destroy();

    res.json({ message: 'Diente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el diente:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el diente' });
  }
};
