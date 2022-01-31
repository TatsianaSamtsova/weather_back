const express = require('express');
const router = express.Router();
const WeatherService = require('../services/weather.service')

router.get('/:city', (req, res) => {
    try {
        const {city} = req.params

        const response = WeatherService.getCityWeather(city)

        res.status(200).json({
            data: response.data
        })

    } catch (err) {
        res.status(500).json({
            message: err,
        })
    }
});
router.get('/',(req, res)=> {
    try {
        const response = WeatherService.addCityWeather()

            res.status(200).json({
                data: response.data,
            })

    } catch (err) {
        res.status(500).json({
            message: err,
        })
    }
});

module.exports = router;