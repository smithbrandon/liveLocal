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

<<<<<<< HEAD
exports.update = function(id, title,summary,description,images,userId,tickets,ticketsUrl,eventUrl,petFriendly,familyFriendly,
		smokeFree,alcoholFree,outdoors,daytime,cost,isEighteen,isTwentyOne,startDate,endDate) {
    return db.empty('EventUpdate', [id, title,summary,	description,images,userId,tickets,ticketsUrl,eventUrl,petFriendly,familyFriendly,
		smokeFree,alcoholFree,outdoors,daytime,cost,isEighteen,isTwentyOne,startDate,endDate]);
}

exports.create = function(title,summary,description,images,userId,tickets,ticketsUrl,eventUrl,petFriendly,familyFriendly,
		smokeFree,alcoholFree,outdoors,daytime,cost,isEighteen,isTwentyOne,startDate,endDate, status) {
    return db.row('EventAdd', [title,summary,description,images,userId,tickets,ticketsUrl,eventUrl,petFriendly,familyFriendly,
		smokeFree,alcoholFree,outdoors,daytime,cost,isEighteen,isTwentyOne,startDate,endDate, status]);
=======
exports.update = function(id, title, summary, description, images, userId, tickets, ticketsUrl, eventUrl, petFriendly, familyFriendly, smokeFree, alcoholFree, outdoors, daytime, cost, isEighteen, isTwentyOne, startDate, endDate, status) {
    return db.empty('EventUpdate', [id, title, summary,	description, images, userId, tickets, ticketsUrl, eventUrl,petFriendly, familyFriendly, smokeFree, alcoholFree, outdoors, daytime, cost, isEighteen, isTwentyOne,startDate, endDate, status]);
}

exports.create = function(title, summary, description, images, userId, tickets, ticketsUrl, eventUrl, petFriendly, familyFriendly, smokeFree, alcoholFree, outdoors, daytime, cost, isEighteen, isTwentyOne, startDate, endDate, status) {
    return db.row('EventAdd', [title, summary, description, images, userId, tickets, ticketsUrl, eventUrl, petFriendly, familyFriendly, smokeFree, alcoholFree, outdoors, daytime, cost, isEighteen, isTwentyOne, startDate, endDate, status]);
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
>>>>>>> ce6e1f636729fa8e2fa70ef10cef3e49aa938075
}