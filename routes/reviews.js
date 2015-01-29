var express = require('express');
var router = express.Router();
var lodash = require('lodash');

var Review = require('../models/review');


///////////////////////////////
////// Routes WITHOUT id //////
///////////////////////////////


router.get('/', function(req, res){
	Review.find( {} , function(err, reviews){
		if(err) {
			res.send(404, err);
		}
		else {
			res.send(200, reviews);
		}
	});
});

router.post('/', function(req, res){
	if(req.isAuthenticated()){
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
	}
	else
		res.json({message: 'You have to be authenticated to add a review'});
});

router.delete('/', function(req, res){
	if(req.isAuthenticated()){
		Review.remove(function(err){
			if(err)
				res.send(404, err);
			else
				res.send(200, {message: 'Reviews deleted.'});
		});
	}
	else
		res.send({message: "You have to be authenticated to delete reviews"});
});


///////////////////////////////
////// Routes WITH id /////////
///////////////////////////////


router.get('/:id', function(req, res){

	Review.findById(req.params.id, function(err, review){
		if(err)
			res.send(404, err);
		else
			res.send(200, review);
	});
});

router.put('/:id', function(req, res){

	if(req.isAuthenticated()){
		Review.update({ _id: req.params.id }, req.body, function(err, review){
			if(err) {
				res.send(404, err);
			}
			else {
				res.send(200, {message: 'Review modified'});
			}
		});
	}
	else
		res.json({message: 'You have to be authenticated to modify a review'});

});

router.delete('/:id', function(req, res){
	
	if(req.isAuthenticated()){
		Review.remove({ _id: req.params.id }, function(err, review){
			if(err)
				res.send(404, err);
			else
				res.send(200, { message: 'Review deleted'});
		});
	}
	else
		res.send({message: "You have to be authenticated to delete reviews"});
});

module.exports = router;