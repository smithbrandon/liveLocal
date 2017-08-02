var express = require('express');
var procedures = require('../procedures/tags.proc');

var router = express.Router();

router.route('/')
.get(function(req, res) {
    procedures.all()
    .then(function(tags) {
        res.send(tags);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
})
.post(function(req, res) {
    var p = req.body;
    procedures.create(p.tag)
    .then(function(tag) {
        res.status(201).send(tag);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
});

//display single tag
router.route('/:id')
.get(function(req, res) {
    procedures.read(req.params.id)
    .then(function(tag) {
        res.send(tag);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
})
.put(function(req, res) {
    console.log(req.params);
    console.log(req.body);
    procedures.update(req.params.id, req.body.tag)
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
})

router.route('/event/:eventId')
    .get(function(req, res){
        procedures.tagsByEvent(req.params.eventId)
            .then(function(tags){
                res.send(tags);
            },function(err){
                console.log(err);
                res.sendStatus(500);
            })
    })
module.exports = router;