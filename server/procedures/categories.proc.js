var db = require('../config/db');

exports.all = function() {
    return db.rows('CategoriesGet');
}

exports.read = function(id) {
    return db.row('CategoryGet', [id]);
}

exports.create = function(id) {
    return db.row('CategoryAdd', [id]);
}

