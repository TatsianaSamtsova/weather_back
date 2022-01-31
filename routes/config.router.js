const express = require('express');
const router = express.Router();
const ConfigService = require('../services/config.service')

router.get('/', ConfigService.getConfig);
router.post('/', ConfigService.setConfig);
router.put('/', ConfigService.updateConfig);
router.delete('/:city', ConfigService.deleteConfig);

module.exports = router;