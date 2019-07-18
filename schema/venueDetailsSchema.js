var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var venueDetailSchema = new Schema({
    venue_photos: [String],
    venue_reviews: [String],
    _id: String
});
var VenueDetail = mongoose.model('VenueDetail', venueDetailSchema, "venue_details");

module.exports = VenueDetail