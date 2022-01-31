const express = require('express');
const router = express.Router();
const WeatherService = require('../services/weather.service')

router.get('/', WeatherService.addCityWeather);
router.get('/:city', WeatherService.getCityWeather);

module.exports = router;