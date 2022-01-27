const axios = require("axios");
const weatherConfig = require("../config/weather.config");

class ConfigService {
    async setConfig(req, res) {

        try {
            const { city, units }= req.body;

            const response = await axios
                .post(
                    'http://localhost:5000/setting',
                    { city: city, units: units }
                )
            console.log('test')
            weatherConfig.city.push(city);
            weatherConfig.units = units;

            res.status(200).json({
                data: response,
            })

        } catch (err) {
            res.status(400).json({
                message: err,
            })
        }
    }

}

module.exports = new ConfigService()