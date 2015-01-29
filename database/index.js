'use strict'

var mongoose = require('mongoose');

if(process.env.ENV == 'HEROKU'){
	mongoose.connect(process.env.MONGO_STRING_CONNECTION);
}
else {
	mongoose.connect('mongodb://localhost:27017/ws-restapi');
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
	console.log('Connection establish to: mongodb://localhost:27017/ws-restapi');
});