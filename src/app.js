var express = require('express'),
    routes = require('./routes'),
    path = require('path');

var app = express();
app.directory = __dirname;

app.set('views', path.join(app.directory, '/app'));
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/app'));

require('./routes')(app);

module.exports = app;
