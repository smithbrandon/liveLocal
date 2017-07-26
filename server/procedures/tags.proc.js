var db = require('../config/db');

exports.all = function() {
    return db.rows('TagsGet');
}
exports.read = function(id) {
    return db.row('TagGet', [id]);
}
exports.create = function(tag) {
    return db.row('TagAdd', [tag]);
}
exports.update = function(id, tag) {
    return db.empty('TagUpdate', [id, tag]);
}
exports.destroy = function(id) {
    return db.empty('TagDelete', [id]);
}