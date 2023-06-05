const express = require('express');
const router = express.Router();
const historiaMedicaController = require('../controllers/historiaMedicaController');

// Rutas para las historias médicas
router.get('/', historiaMedicaController.getAllHistoriasMedicas);
router.get('/:id', historiaMedicaController.getHistoriaMedicaById);
router.post('/', historiaMedicaController.createHistoriaMedica);
router.put('/:id', historiaMedicaController.updateHistoriaMedica);
router.delete('/:id', historiaMedicaController.deleteHistoriaMedica);

module.exports = router;
