const express = require('express');
const router = express.Router();
const dentistaController = require('../controllers/denistaController');

// Obtener todos los dentistas
router.get('/', dentistaController.getAllDentistas);

// Obtener un dentista por su ID
router.get('/:id', dentistaController.getDentistaById);

// Crear un nuevo dentista
router.post('/', dentistaController.createDentista);

// Actualizar un dentista por su ID
router.put('/:id', dentistaController.updateDentista);

// Eliminar un dentista por su ID
router.delete('/:id', dentistaController.deleteDentista);

module.exports = router;
