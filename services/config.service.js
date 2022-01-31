const db = require("../db");
const pgp = db.$config.pgp;

class ConfigService {
    async setConfig(city, units, interval) {

        const duplicate = await db.query('SELECT city_name FROM config WHERE city_name = $1', [city])

        if (!duplicate.length) {
            const config = {
                city_name: city,
                units: units,
                interval: interval
            }

            await db.query(pgp.helpers.insert(config, null, 'config'))

        }
    }

    async getConfig() {

        await db.query('SELECT * FROM config;')
    }

    async updateConfig(id, city, units, interval) {

            const config = {
                config_id: id,
                city_name: city,
                units: units,
                interval: interval
            }
            const condition = pgp.as.format(' WHERE config_id = ${config_id}', config);
            await db.query(pgp.helpers.update(config, ['city_name', 'units', 'interval'], 'config') + condition)
    }

    async deleteConfig(city) {

       await db.query('DELETE FROM config WHERE city_name = $1', [city])
    }
}

module.exports = new ConfigService()