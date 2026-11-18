const router = require('express').Router();
const tutorController = require('../controllers/tutorController');

router.get('/', tutorController.listar);
router.get('/:id', tutorController.buscarPorId);
router.post('/', tutorController.criar);
router.put('/:id', tutorController.atualizar);

module.exports = router;