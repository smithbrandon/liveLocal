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

exports.update = function(id, name) {
    return db.empty('CategoryUpdate', [id, name]);
}

exports.destroy = function(id) {
    return db.empty('CategoryDelete', [id]);
}
