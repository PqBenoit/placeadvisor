var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    placeType: {
        type: String, 
        required: true
    },
    stars: {
        type: Number, 
        required: true
    }
});

module.exports = mongoose.model('Review', ReviewSchema);