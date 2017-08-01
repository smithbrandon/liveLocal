var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var api = require('./api');
var configurePassport = require('./config/passport');
var routing = require('./middleware/routing.mw');

var clientPath = path.join(__dirname, '../client');

var app = express();
app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());

configurePassport(app);

app.use('/api', api);

app.get('*', routing.stateRouting);
app.listen(process.env.PORT || 3000);