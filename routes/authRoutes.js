const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Ruta para autenticar al paciente por nombre y DNI
router.post('/authenticate', authController.authenticatePaciente);

// Ruta para obtener el perfil del paciente autenticado
router.get('/profile', authController.getProfilePaciente);

// Ruta para registrar un nuevo paciente
router.post('/register', authController.registerPaciente);

// Ruta para cerrar sesión del paciente
router.get('/logout', authController.logout);

module.exports = router;
