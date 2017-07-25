var express= require('express');
var categories = require('./controllers/categories.ctrl');
var events = require('./controllers/events.ctrl');
var tags = require('./controllers/tags.ctrl');
var users = require('./controllers/users.ctrl');


var router = express.Router();
router.use('/categories', categories);
router.use('/events', events);
router.use('/tags', tags);
router.use('/users', users);

module.exports = router;