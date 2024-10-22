const express = require('express');
const router = express.Router();
const chamadoController = require('../controllers/chamadoController');

router.get('/', chamadoController.getChamados);
router.post('/', chamadoController.createChamado);

module.exports = router;