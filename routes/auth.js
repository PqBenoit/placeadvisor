var express = require('express');
var router = express.Router();
var passport = require('passport');

require('../passport/passport');

router.get('/signup/success', function(req, res){
	res.json({message: 'Successfully signed up, you can now add, delete, modify reviews'});
});

router.get('/login/success', function(req, res){
	res.json({message: 'Successfully logged in, you can now add, delete, modify reviews'});
});

router.get('/logout', function(req, res){
	req.logout();
	res.send(200, {message: "Successfullt logged out."});
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/auth/signup/success', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/auth/login/success', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));



module.exports = router;