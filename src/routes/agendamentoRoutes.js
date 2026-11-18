const router = require('express').Router();
const agendamentoController = require('../controllers/agendamentoController');

router.get('/', agendamentoController.listar);
router.post('/', agendamentoController.criar);
router.put('/:id/data', agendamentoController.atualizarData);

module.exports = router;