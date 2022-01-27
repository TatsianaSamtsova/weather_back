const express = require('express');
const BodyParser = require('body-parser');

const config = require('./config');
const indexRouter = require('./routes/index');
const weatherRouter = require('./routes/weather.router');
const configRouter = require('./routes/config.router');

const app = express();

app.use(express.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/weather', weatherRouter)
app.use('/setting', configRouter)

app.listen(config.port, (err) => {
    if(err) { console.log(err) }
    console.log('Weather app listening on port ' + config.port);
})