var express = require('express');
var procedures = require('../procedures/users.proc');

var router = express.Router();

router.route('/')
.get(function(req, res) {
    procedures.all()
    .then(function(users) {
        res.send(users);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
})
.post(function(req, res) {
    var p = req.body;
    procedures.create(p.firstName, p.lastName, p.companyName, p.email, p.phone, p.password)
    .then(function(id) {
        res.status(201).send(id);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
});

router.route('/:id')
    .get(function(req, res) {
        procedures.read(req.params.id)
        .then(function(user) {
            res.send(user);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .put(function(req, res){
        var p = req.body;
        procedures.update(req.params.id, p.firstName, p.lastName, p.companyName, p.email, p.phone, p.password)
        .then(function(user){
            res.sendStatus(204);
        },function(err){
            console.log(err);
            res.sendStatus(500);
        })
    })
    .delete(function(req, res){
        procedures.destroy(req.params.id)
        .then(function(user){
            res.sendStatus(204);
        },function(err){
            console.log(err);
            res.sendStatus(500);
        })
    })

    module.exports = router;