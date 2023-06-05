const Usuario = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario en la base de datos por email
    const usuario = await Usuario.findOne({ where: { email } });

    if (usuario) {
      // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
      const contraseñaValida = await bcrypt.compare(password, usuario.password);

      if (contraseñaValida) {
        // Generar un token de sesión
        const token = jwt.sign({ id: usuario.id }, 'secreto', { expiresIn: '1h' });

        // Establecer la cookie de sesión
        res.cookie('session', token, { httpOnly: true });

        res.json({ success: true, message: 'Inicio de sesión exitoso', emailCorrecto: true });
      } else {
        res.status(401).json({ success: false, message: 'Contraseña incorrecta', emailCorrecto: true });
      }
    } else {
      res.status(401).json({ success: false, message: 'Usuario no encontrado', emailCorrecto: false });
    }
  } catch (error) {
    console.error('Error al realizar el inicio de sesión:', error);

    if (error.name === 'SequelizeDatabaseError') {
      if (error.parent && error.parent.code === 'ER_BAD_FIELD_ERROR') {
        res.status(400).json({ success: false, message: 'Campo inválido en la solicitud', emailCorrecto: true });
      } else if (error.parent && error.parent.code === 'ER_NO_SUCH_COLUMN') {
        res.status(400).json({ success: false, message: 'Columna no encontrada en la base de datos', emailCorrecto: true });
      } else {
        res.status(500).json({ success: false, message: 'Ocurrió un error al realizar el inicio de sesión', emailCorrecto: true });
      }
    } else {
      res.status(500).json({ success: false, message: 'Ocurrió un error al realizar el inicio de sesión', emailCorrecto: true });
    }
  }
};

exports.logout = (req, res) => {
  // Eliminar la cookie de sesión
  res.clearCookie('session');
  res.json({ success: true, message: 'Cierre de sesión exitoso' });
};
