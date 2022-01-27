const promise = require('bluebird');
const initOptions = {
    promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);

const cn = {
    host:  process.env.HOST ? process.env.HOST : 'localhost',
    port: process.env.DB_PORT,
    database: 'postgres',
    user: 'postgres',
    password: '123',
    allowExitOnIdle: true
};


const db = pgp(cn);


module.exports = db;
