var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api');
var routing = require('./middleware/routing.mw');

var clientPath = path.join(__dirname, '../client');

var app = express();
app.use(express.static(clientPath));
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', routing.stateRouting);
app.listen(process.env.PORT || 3000);