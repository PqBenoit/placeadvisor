var express = require('express');
var router = express.Router();
var lodash = require('lodash');

var initialise = [
	{
		id: 1,
		name: 'MacDo',
		placeType: 'Fastfood',
		stars: 5
	},
	{
		id: 2,
		name: 'Quick',
		placeType: 'Fastfood',
		stars: 2
	},
	{
		id: 3,
		name: 'Subway',
		placeType: 'Fastfood',
		stars: 4
	}
]


///////////////////////////////
////// Routes WITHOUT id //////
///////////////////////////////


router.get('/', function(req, res){	

	res.send(initialise);

});

router.post('/', function(req, res){
	
	initialise.push(
		{
			id: initialise.length + 1,
			name: req.body.name,
			placeType: req.body.placeType,
			stars: req.body.stars
		}
	);

	res.send(initialise);

});

router.delete('/', function(req, res){

	initialise = [];

	res.send(initialise);

});


///////////////////////////////
////// Routes WITH id /////////
///////////////////////////////


router.get('/:id', function(req, res){

	res.send(initialise[req.params.id - 1]);

});

router.put('/:id', function(req, res){

	initialise[req.params.id - 1].name = req.body.name;
	initialise[req.params.id - 1].placeType = req.body.placeType;
	initialise[req.params.id - 1].stars = req.body.stars;

	res.send(initialise[req.params.id - 1]);

});

router.delete('/:id', function(req, res){
	
	lodash.pullAt(initialise, [req.params.id - 1]);

	res.send(initialise);

});



module.exports = router;