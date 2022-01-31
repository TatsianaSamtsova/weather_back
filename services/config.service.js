const db = require("../db");
const pgp = db.$config.pgp;

class ConfigService {
    async setConfig(req, res) {
        try {
            const {city, units, interval} = req.body;
            const duplicate = await db.query('SELECT city_name FROM config WHERE city_name = $1', [city])

            if (!duplicate.length) {
                const config = {
                    city_name: city,
                    units: units,
                    interval: interval
                }

                const newConfig = await db.query(pgp.helpers.insert(config, null, 'config'))

                res.status(200).json({
                    data: newConfig.rows[0]
                })
            } else {
                res.status(200).json({
                    message: 'The city has already been added to the settings'
                })
            }

        } catch (err) {
            res.status(400).json({
                message: err,
            })
        }
    }

    async getConfig(req, res) {
        try {
            const config = await db.query('SELECT * FROM config;')

            res.status(200).json({
                data: config
            })

        } catch (err) {
            res.status(400).json({
                message: err,
            })
        }
    }

    async updateConfig(req, res) {
        try {
            const {id, city, units, interval} = req.body;

            const config = {
                config_id: id,
                city_name: city,
                units: units,
                interval: interval
            }
            const condition = pgp.as.format(' WHERE config_id = ${config_id}', config);
            const updateConfig = await db.query(pgp.helpers.update(config, ['city_name', 'units', 'interval'], 'config') + condition)

            res.status(200).json({
                data: updateConfig
            })

        } catch (err) {
            res.status(400).json({
                message: err,
            })
        }
    }

    async deleteConfig(req, res) {
        try {
            const {city} = req.params

            const config = await db.query('DELETE FROM config WHERE city_name = $1', [city])

            res.status(200).json({
                data: config
            })

        } catch (err) {
            res.status(400).json({
                message: err,
            })
        }
    }
}

module.exports = new ConfigService()