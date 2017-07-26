var db = require('../config/db.js');

exports.all = function() {
    return db.rows('EventsGet');
}

exports.read = function(eventId) {
    return db.row('EventGet', [eventId]);
}

exports.destroy = function(eventId) {
    return db.empty('EventDelete', eventId);
}

exports.update = function(id, title,summary,description,images,userId,tickets,ticketsUrl,eventUrl,petFriendly,familyFriendly,
		smokeFree,alcoholFree,outdoors,daytime,cost,isEighteen,isTwentyOne,startDate,endDate) {
    return db.empty('EventUpdate', [id, title,summary,	description,images,userId,tickets,ticketsUrl,eventUrl,petFriendly,familyFriendly,
		smokeFree,alcoholFree,outdoors,daytime,cost,isEighteen,isTwentyOne,startDate,endDate]);
}

exports.create = function(title,summary,description,images,userId,tickets,ticketsUrl,eventUrl,petFriendly,familyFriendly,
		smokeFree,alcoholFree,outdoors,daytime,cost,isEighteen,isTwentyOne,startDate,endDate, status) {
    return db.row('EventAdd', [title,summary,description,images,userId,tickets,ticketsUrl,eventUrl,petFriendly,familyFriendly,
		smokeFree,alcoholFree,outdoors,daytime,cost,isEighteen,isTwentyOne,startDate,endDate, status]);
}