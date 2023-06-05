const Usuario = require('../models/Usuarios');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los usuarios' });
  }
};

// Obtener un usuario por su ID
exports.getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el usuario' });
  }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  const { nombre, edad, email, password } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!nombre || !edad || !email || !password) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Generar un hash de la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const usuario = await Usuario.create({ nombre, edad, email, password: hashedPassword });

    res.status(201).json(usuario);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear el usuario' });
  }
};

// Actualizar un usuario por su ID
exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, edad, email, password } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!nombre || !edad || !email || !password) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Buscar el usuario en la base de datos y actualizarlo
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Generar un hash de la nueva contraseña antes de actualizarla
    const hashedPassword = await bcrypt.hash(password, 10);

    usuario.nombre = nombre;
    usuario.edad = edad;
    usuario.email = email;
    usuario.password = hashedPassword;
    await usuario.save();

    res.json(usuario);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar el usuario' });
  }
};

// Eliminar un usuario por su ID
exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el usuario en la base de datos y eliminarlo
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuario.destroy();

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el usuario' });
  }
};
