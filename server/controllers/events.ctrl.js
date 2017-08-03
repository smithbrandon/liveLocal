var express = require('express');
var procedures = require('../procedures/events.proc');

var router = express.Router();

router.route('/')
.get(function(req, res) {
    procedures.all()
    .then(function(events) {
        res.send(events);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
})
.post(function(req, res) {
    var p = req.body;
    console.log(p.startDate);
    console.log(p.endDate);
    procedures.create(p.title, p.summary, p.description, p.images, p.userId, p.tickets, p.ticketsUrl, p.eventUrl, p.petFriendly, p.familyFriendly,
		p.smokeFree, p.alcoholFree, p.outdoors, p.daytime, p.cost, p.isEighteen, p.isTwentyOne, p.startDate, p.endDate, p.status, p.address1, p.address2, p.city, p.state, p.zip, p.lat, p.lng)
    .then(function(id) {
        res.status(201).send(id);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get('/user/:UserId',function(req, res){
    procedures.eventsByUser(req.params.UserId)
        .then(function(events){
            res.send(events);
        },function(err){
            console.log(err);
            res.sendStatus(500);
        })
})

router.get('/interests/:UserId',function(req, res){
    procedures.interestsByUser(req.params.UserId)
        .then(function(events){
            res.send(events);
        },function(err){
            console.log(err);
            res.sendStatus(500);
        })
})

router.route('/:id')
    .get(function(req, res) {
        procedures.read(req.params.id)
        .then(function(event) {
            res.send(event);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .put(function(req, res) {
        var p = req.body;
        procedures.update(req.params.id, p.title, p.summary, p.description, p.images, p.userId, p.tickets, p.ticketsUrl, p.eventUrl, p.petFriendly, p.familyFriendly, p.smokeFree, p.alcoholFree, p.outdoors, p.daytime, p.cost, p.isEighteen, p.isTwentyOne, p.startDate, p.endDate, p.status, p.address1, p.address2, p.city, p.state, p.zip, p.lat, p.lng)
        .then(function() {
            res.sendStatus(204);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .delete(function(req, res) {
        procedures.destroy(req.params.id)
        .then(function() {
            res.sendStatus(204);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

router.route('/:id/interested')
    .get(function(req, res){
    procedures.interestGet(req.params.id)
        .then(function(cnt){
            res.send(cnt);
        },function(err){
            console.log(err);
            res.sendStatus(500);
        })
    })
    .post(function(req,res){
        procedures.interestAdd(req.body.userId, req.params.id)
            .then(function(interest){
                res.send(interest);
            },function(err){
                console.log(err);
                res.sendStatus(201);
            })
    })

router.route('/:id/going')
    .get(function(req,res){
        procedures.goingGet(req.params.id)
            .then(function(cnt){
                res.send(cnt);
            },function(err){
                console.log(err);
                res.sendStatus(500);
            })
    })
    .post(function(req,res){
        procedures.goingAdd(req.body.userId, req.params.id)
            .then(function(going){
                res.send(going);
            },function(err){
                console.log(err);
                res.sendStatus(500);
            })
    })
router.post('/:id/tag', function(req,res){
    console.log(req.params.id);
    console.log(req.body.tag);
    procedures.addTag(req.params.id,req.body.tagId)
    .then(function(tag){
        res.sendStatus(201);
    },function(err){
        console.log(err);
        res.sendStatus(500);
    })
});

router.delete('/:eventId/tag/:id',function(req,res){
    procedures.removeTag(req.params.eventId, req.params.id)
    .then(function(tag){
        res.sendStatus(204);
    },function(err){
        console.log(err);
        res.sendStatus(500);
    })
});
module.exports = router;