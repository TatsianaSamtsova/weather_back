const express = require('express');
const BodyParser = require('body-parser');

const config = require('./config');
const indexRouter = require('./routes/index');
const cityRouter = require('./routes/city.router');

const app = express();

app.use(express.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/city', cityRouter)

app.listen(config.port, (err) => {
    if(err) { console.log(err) }
    console.log('Weather app listening on port ' + config.port);
})