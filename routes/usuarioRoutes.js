const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const loginController = require('../controllers/loginController')

const router = express.Router();

// Obtener todos los usuarios
router.get('/', usuarioController.getAllUsuarios);

// Obtener un usuario por su ID
router.get('/:id', usuarioController.getUsuarioById);

// Crear un nuevo usuario
router.post('/', usuarioController.createUsuario);

// Actualizar un usuario por su ID
router.put('/:id', usuarioController.updateUsuario);

// Eliminar un usuario por su ID
router.delete('/:id', usuarioController.deleteUsuario);




module.exports = router;
