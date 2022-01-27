const axios = require("axios");
const config = require("../config");
// const weatherConfig = require("../config/weather.config");
const db = require("../db");
const pgp = db.$config.pgp;

class WeatherService {
    async getCityWeather(req, res) {

        // try {
        //     const city = req.query.q;
        //     const units = req.query.units;
        //
        //     const response = await axios
        //         .get(
        //             `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${config.apiKey}`
        //         )
        //
        //     res.status(200).json({
        //         data: response,
        //     })
        //
        // } catch (err) {
        //     res.status(400).json({
        //         message: err,
        //     })
        // }


        // db.query('SELECT city_name,date FROM weather;')
        //     .then(rows => {
        //         console.log(rows);
        //         res.json(rows)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }

    async addCityWeather(req, res) {
        try {
            const cities = ["Paris","Kiev"]
            const units = 'metric'
            new Promise(() => {
                console.log('test')

                setInterval(async () => {
                    console.log('test3')
                    const promisesOfCities = cities.map(city => new Promise(async () => {
                      const response =  await axios
                            .get(
                                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${config.apiKey}`
                            )
                        console.log('success')

                        const setData = {
                            city_name: city,
                            date: new Date(),
                            description: response.data.weather[0].description,
                            temperature: response.data.main.temp,
                            temperature_feels_like: response.data.main.feels_like,
                            pressure: response.data.main.pressure,
                            humidity: response.data.main.humidity,
                            wind_speed: response.data.wind.speed
                        }

                        await db.query(pgp.helpers.insert(setData, null, 'weather'))

                    }))

                    const response = await Promise.all(promisesOfCities)

                    res.status(200).json({
                        data: response.data,
                    })

                }, 15000)
            })

        } catch (err) {
            res.status(400).json({
                message: err,
            })
        }
    }

}

module.exports = new WeatherService()