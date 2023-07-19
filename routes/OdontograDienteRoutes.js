const express = require('express');
const router = express.Router();
const odontograDienteController = require('../controllers/OdontograDienteController');

// Rutas para los dientes del odontograma
router.get('/dientes', odontograDienteController.getAllDientes);
router.get('/dientes/:id', odontograDienteController.getDienteById);
router.post('/dientes', odontograDienteController.createDiente);
router.put('/dientes/:id', odontograDienteController.updateDiente);
router.delete('/dientes/:id', odontograDienteController.deleteDiente);

module.exports = router;
