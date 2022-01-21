// const express = require('express');
// const axios = require("axios");
// const config = require('./config');
// const app = require("request");
// const router = express.Router();
//
// app.post('/api/weather', (req, res) => {
//
//     try {
//         const city = req.body.city
//         axios
//             .post(
//                 `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.apiKey}`,
//                 {city: city}  )
//             .then((response) => {
//                 const weatherData = response.data
//                 res.status(200).json({
//                     status: 200,
//                     error: false,
//                     data: weatherData,
//                 })
//             })
//             .catch((err) => {
//                 res.status(404).json({
//                     status: 404,
//                     error: true,
//                     message: err.message,
//                 })
//             })
//     } catch (err) {
//         res.status(400).json({
//             status: 400,
//             error: true,
//             message: err,
//         })
//     }
// })
//
//
// module.exports = router;