var db = require('../config/db');

exports.create = function(tag) {
    return db.row('TagAdd', [tag]);
}

