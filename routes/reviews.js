var express = require('express');
var router = express.Router();
var lodash = require('lodash');

var accepts = require('accepts'); //Used to check accept's format

var Review = require('../models/review');


///////////////////////////////
////// Routes WITHOUT id //////
///////////////////////////////


router.get('/', function(req, res){

	var accept = accepts(req);

	Review.find( {} , function(err, reviews){
		if(err) {
			res.send(404, err);
		}
		else {
			if(accept.type(['json', 'html']) == 'json'){
				res.setHeader('Content-Type', 'application/json');
				res.send(200, reviews);
			}
			else if(accept.type(['json', 'html']) == 'html') {
				res.setHeader('Content-Type', 'text/html')
				res.render('reviews/index', { reviews: reviews });
			}
		}
	});
});

router.post('/', function(req, res){
	review = new Review();
	review.name = req.body.name;
	review.placeType = req.body.placeType;
	review.stars = req.body.stars;

	review.save(function(err, review){
		if(err){
			res.send(400, err);
		}
		else {
			res.send(201, review);
		}
	});
});

router.delete('/', function(req, res){
	Review.remove(function(err){
		if(err)
			res.send(404, err);
		else
			res.send(200, {message: 'Reviews deleted.'});
	});
});


///////////////////////////////
////// Routes WITH id /////////
///////////////////////////////


router.get('/:id', function(req, res){

	var accept = accepts(req);

	Review.findById(req.params.id, function(err, review){
		if(err)
			res.send(404, err);
		else
			if(accept.type(['json', 'html']) == 'json'){
				res.setHeader('Content-Type', 'application/json');
				res.send(200, review);
			}
			else if(accept.type(['json', 'html']) == 'html') {
				res.setHeader('Content-Type', 'text/html');
				res.render('reviews/show', { review: review });
			}
	});
});

router.put('/:id', function(req, res){

	Review.update({ _id: req.params.id }, req.body, function(err, review){
		if(err) {
			res.send(404, err);
		}
		else {
			res.send(200, {message: 'Review modified'});
		}
	});
});

router.delete('/:id', function(req, res){
	
	Review.remove({ _id: req.params.id }, function(err, review){
		if(err)
			res.send(404, err);
		else
			res.send(200, { message: 'Review deleted'});
	});
});

module.exports = router;