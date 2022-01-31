const axios = require("axios");
const cron = require("node-cron");
const config = require("../config");
const db = require("../db");
const pgp = db.$config.pgp;

class WeatherService {
    async getCityWeather(city) {

        return await db.query('SELECT * FROM weather WHERE config_id IN (' +
            'SELECT config_id FROM config WHERE city_name = $1) ', [city])
    }

    async addCityWeather() {

        const cities = await db.query('SELECT * FROM config;')

        cron.schedule("*/10 * * * * *", async () => {

            const promisesOfCities = cities.map(city => new Promise(async () => {
                console.log('running test')
                const {config_id, city_name, units} = city
                const response = await axios
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

                return db.query(pgp.helpers.insert(setData, null, 'weather'))
            }))

            await Promise.all(promisesOfCities)
        })
    }
}

module.exports = new WeatherService()