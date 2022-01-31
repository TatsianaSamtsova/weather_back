const express = require('express');
const router = express.Router();
const ConfigService = require('../services/config.service')

router.get('/', (req, res) => {
    try {
        const response = ConfigService.getConfig()

        res.status(200).json({
            data: response
        })

    } catch (err) {
        res.status(500).json({
            message: err,
        })
    }
});
router.post('/', (req, res) => {
    try {
        const {city, units, interval} = req.body;
        const response = ConfigService.setConfig(city, units, interval)

        res.status(200).json({
            data: response.rows[0]
        })

    } catch (err) {
        res.status(400).json({
            message: err,
        })
    }
});
router.put('/', (req, res) => {
    try {
        const {id, city, units, interval} = req.body;

        const response = ConfigService.updateConfig(id, city, units, interval)

        res.status(200).json({
            data: response
        })

    } catch (err) {
        res.status(400).json({
            message: err,
        })
    }
});
router.delete('/:city', (req,res)=>{
    try {
        const {city} = req.params

        const response = ConfigService.deleteConfig(city)

        res.status(200).json({
            data: response
        })

    } catch (err) {
        res.status(500).json({
            message: err,
        })
    }});

module.exports = router;