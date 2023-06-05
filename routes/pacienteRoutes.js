const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// Obtener todos los pacientes
router.get('/', pacienteController.getAllPacientes);

// Obtener un paciente por su ID
router.get('/:id', pacienteController.getPacienteById);

// Crear un nuevo paciente
router.post('/', pacienteController.createPaciente);

// Actualizar un paciente por su ID
router.put('/:id', pacienteController.updatePaciente);

// Eliminar un paciente por su ID
router.delete('/:id', pacienteController.deletePaciente);

module.exports = router;
