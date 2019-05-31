var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Venue = new Schema({
    _id: Number,
    name: String,
    address: String,
    bestPhoto: String,
    attributes:String,
    categories:[String]

});

module.exports = Venue