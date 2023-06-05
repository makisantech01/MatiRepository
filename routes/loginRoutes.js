const express = require('express');
const { login, logout } = require('../controllers/loginController');


const router = express.Router();

// Ruta para el inicio de sesión
router.post('/login', login);

// Ruta para el cierre de sesión
router.post('/logout', logout);

module.exports = router;
