var express = require('express');
var procedures = require('../procedures/categories.proc');

var router = express.Router();

router.route('/')
.get(function(req, res) {
    procedures.all()
    .then(function(categories) {
        res.send(categories);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
})
.post(function(req, res) {
    var p = req.body;
    procedures.create(p.name)
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
        .then(function(categories) {
            res.send(categories);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .put(function(req, res){
        procedures.update(req.params.id, req.body.name)
        .then(function(categories){
            res.sendStatus(204);
        },function(err){
            console.log(err);
            res.sendStatus(500);
        })
    })
    .delete(function(req, res){
        procedures.destroy(req.params.id)
        .then(function(category){
            res.sendStatus(204);
        },function(err){
            console.log(err);
            res.sendStatus(500);
        })
    });
    
    module.exports = router;