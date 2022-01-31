const axios = require("axios");
const config = require("../config");
const db = require("../db");
const pgp = db.$config.pgp;

class WeatherService {
    async getCityWeather(req, res) {
        try {
            const { city } = req.params

            const cityWeather = await db.query('SELECT * FROM weather WHERE config_id IN (' +
                'SELECT config_id FROM config WHERE city_name = $1) ', [city])

            res.status(200).json({
                data: cityWeather
            })

        } catch (err) {
            res.status(400).json({
                message: err,
            })
        }
    }

    async addCityWeather(req, res) {
        try {
            const cities = await db.query('SELECT * FROM config;')

            new Promise(() => {

                setInterval(async () => {

                    const promisesOfCities = cities.map(city => new Promise(async () => {
                      const {config_id, city_name, units} = city
                      const response =  await axios
                            .get(
                                `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=${units}&appid=${config.apiKey}`
                            )

                        const setData = {
                            config_id: config_id,
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

                }, 20000)
            })

        } catch (err) {
            res.status(400).json({
                message: err,
            })
        }
    }
}

module.exports = new WeatherService()