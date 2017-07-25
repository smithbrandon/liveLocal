var db = require('../config/db');

exports.all = function() {
    return db.rows('UsersGet');
}

exports.read = function(id) {
    return db.row('UserGet' [id])
}

exports.create = function(id, firstName, lastName, companyName, email, phone, password) {
    return db.row('UserAdd', [id, firstName, lastName, companyName, email, phone, password]);
}