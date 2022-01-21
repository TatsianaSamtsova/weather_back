require('dotenv').config()

let config = {
    port: process.env.PORT ? process.env.PORT : 'localhost',
    apiKey: process.env.API_KEY
};

module.exports = config;