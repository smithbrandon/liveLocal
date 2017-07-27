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
		smokeFree,alcoholFree,outdoors,daytime,cost,isEighteen,isTwentyOne,startDate,endDate, status) {
    return db.empty('EventUpdate', [id, title,summary,	description,images,userId,tickets,ticketsUrl,eventUrl,petFriendly,familyFriendly,
		smokeFree,alcoholFree,outdoors,daytime,cost,isEighteen,isTwentyOne,startDate,endDate, status]);
}

exports.create = function(title,summary,description,images,userId,tickets,ticketsUrl,eventUrl,petFriendly,familyFriendly,
		smokeFree,alcoholFree,outdoors,daytime,cost,isEighteen,isTwentyOne,startDate,endDate, status) {
    return db.row('EventAdd', [title,summary,description,images,userId,tickets,ticketsUrl,eventUrl,petFriendly,familyFriendly,
		smokeFree,alcoholFree,outdoors,daytime,cost,isEighteen,isTwentyOne,startDate,endDate, status]);
}

exports.interestAdd = function(eventId,userId){
    return db.row('interestAdd',[eventId,userId]);
}

exports.interestGet = function(eventId){
    return db.row('interestGet',[eventId])
}

exports.goingAdd = function(eventId,userId){
    return db.row('goingAdd',[eventId,userId]);
}

exports.goingGet = function(eventId){
    return db.row('goingGet',[eventId]);
}

exports.addTag = function(eventId,tagId){
    return db.empty('TagEvent',[eventId, tagId]);
}

exports.removeTag = function(eventId, tagId){
    return db.empty('UntagEvent',[eventId, tagId])
}