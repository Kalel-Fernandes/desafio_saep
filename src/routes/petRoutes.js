const router = require('express').Router();
const petController = require('../controllers/petController');

router.get('/', petController.listar);
router.post('/', petController.criar);

module.exports = router;