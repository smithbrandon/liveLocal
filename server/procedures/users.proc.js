var db = require('../config/db');

exports.all = function() {
    return db.rows('UsersGet');
}

exports.read = function(id) {
    return db.row('UserGet', [id])
}

exports.create = function(firstName, lastName, companyName, email, phone, password) {
    return db.row('UserAdd', [firstName, lastName, companyName, email, phone, password]);
}

exports.update = function(id,firstName, lastName, companyName, email, phone, password) {
    return db.empty('UserUpdate', [id,firstName, lastName, companyName, email, phone, password])
}

exports.destroy = function(id) {
    return db.empty('UserDelete', [id])
}