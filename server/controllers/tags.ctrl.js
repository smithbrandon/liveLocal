var express = require('express');
var procedures = require('../procedures/tags.proc');

var router = express.Router();

router.route('/')
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

    module.exports = router;