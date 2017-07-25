var db = require('../config/db');

exports.all = function() {
    return db.rows('EventsGet');
}

exports.read = function(eventId) {
    return db.row('EventGet', [eventId]);
}

exports.destroy = function(eventId) {
    return db.empty('EventDelete', eventId);
}

exports.update = function(title, summary, description, images, categoryid) {
    return db.empty('EventUpdate', [title, summary, description, images, categoryid]);
}

exports.create = function(title, summary, description, images, categoryid) {
    return db.row('EventAdd', [title, summary, description, images, categoryid]);
}