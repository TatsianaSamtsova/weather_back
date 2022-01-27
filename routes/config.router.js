const express = require('express');
const router = express.Router();
const  ConfigService = require('../services/config.service')



router.post('/', ConfigService.setConfig)


module.exports = router;