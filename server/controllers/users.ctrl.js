var express = require('express');
var passport = require('passport');
var procedures = require('../procedures/users.proc');
var auth = require('../middleware/auth.mw');

var router = express.Router();

// for the login

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.sendStatus(500);
            } else {
                return res.send(user);
            }
        });
    })(req, res, next);
});

// router.all('*', auth.isLoggedIn);
// router.post('*', auth.isLoggedIn);
router.put('*', auth.isLoggedIn);
router.delete('*', auth.isLoggedIn);

router.get('/logout', function(req, res) {
    req.session.destroy(function() {
        req.logOut();
        res.sendStatus(204);
    });
});

router.get('/me', function(req, res) {
    res.send(req.user);
});

// For all regular request
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
})
.post(auth.isAdmin, function(req, res) {
    utils.encryptPassword(req.body.password)
    .then(function(hash) {
    return procedures.create(req.body.firstname, req.body.lastname, req.body.email, hash)
    }).then(function(id) {
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