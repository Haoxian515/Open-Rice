const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const VenueSchema = require("../schema/venueSchema");
const districts = require("../districts/districts")


const router = express.Router();

var client_id = "MDWISIUTE4DJVG5HTTBONENXTVRO41TUKFYLVJ0DMBRQYKZM"
var client_secret = "ED1AYFEPPOBFOUV4KF33ONJUH2Q5BITN0JSBWBQLNLK5UAFI"

// GET DATA// GET DATA// GET DATA
// GET DATA// GET DATA// GET DATA
// GET DATA// GET DATA// GET DATA


router.get("/mlab_test", function(req, res){

    var queryString = req.query.input
    var queryArea = req.query.queryArea

    console.log("MLAB TEST ROUTE")
    // console.log(queryString)
    // console.log(queryArea)
    switch( queryArea ){
        case "San Francisco":
            searchDistrict = districts.sanFrancisco
            break;
        case "San Mateo":
            searchDistrict = districts.sanMateo
            break;
        case "Berkeley":
            searchDistrict = districts.berkeley
            break;
        default:
            searchDistrict = districts.sanFrancisco

    }

    let result = []
    VenueSchema
        .find( 
            {$and:[{district: {"$in": searchDistrict}},
            {category:{$regex: queryString, $options: 'i'}}
            ]})
        .lean()
        .exec(function(err, venues){

            // console.log(venues)
            res.send( (venues))

        })

})

// router.get('/getdata', function(req, res) {
//     console.log("hello 3001 getting data")
//     // console.log(req.query)
//     //foursquare api
//     var queryString = req.query.input
//     var queryArea = req.query.queryArea
//     // console.log(req.query)
//     var getVenueIds = function(queryString){
//         request({
//             url: 'https://api.foursquare.com/v2/venues/search',
//             method: 'GET',
//                 qs: {
//                 client_id: client_id,
//                 client_secret: client_secret,
//                 near: queryArea ,
//                 query: queryString,
//                 v: '20180323',
//                 limit: 5
//                 }
//         }
//         ,function(error, request, body) { 
//                 if (error) {
//                     console.error(error);
//                 } else {
//                     let id = (JSON.parse(body)["response"]["venues"][0]["id"])
//                     let id_json = JSON.parse(body)["response"]["venues"];
//                     let ids = []
//                     // console.log(id_json)
//                     id_json.forEach(element => {
//                         // console.log(element["id"])
//                         ids.push(element["id"])
//                     });
//                     // console.log(ids)
//                     res.send(ids)
//                 }
//             }
//         );
//     }

//     console.log("current query string " + queryString)
//     if(queryString !== undefined){
//         getVenueIds(queryString)
//     }else{
//         res.send("Error")
//     }
// });
// GET DATA// GET DATA// GET DATA
// GET DATA// GET DATA// GET DATA
// GET DATA// GET DATA// GET DATA


//get venue detail
// https://api.foursquare.com/v2/venues/VENUE_ID


//create functions venue detail set up venue
// router.get("/venue_detail", function(req, res){
    
//         var venue_id = req.query.venue_id
//         request({
//             url: 'https://api.foursquare.com/v2/venues/' + venue_id,
//             method: 'GET',
//                 qs: {
//                 client_id: client_id,
//                 client_secret: client_secret,
//                 v: '20180323',
//                 VENUE_ID: venue_id
//                 }
//         }, function(error , request, body){
//             let venue_details = JSON.parse(body)["response"]["venue"]
//             res.send(venue_details)
//         })

//     // END GET VENUTE DETAIL
//     // https://fastly.4sqi.net/img/general/ + width960 + /3554975_pgsbwDgSJAPrsxKUmcCU9w3yx_xpV71T820XKEG9Kso.jpg
// })




// gets venue ids for whats hot
router.get('/getMain', function(req, res) {
    var queryString = "coffee"
    var queryArea = districts.sanFrancisco

    console.log("Get main ")

    VenueSchema
        .find( 
            {$and:[{district: {"$in": queryArea}},
            {category:{$regex: queryString, $options: 'i'}}
            ]})
        .limit(5)
        .lean()
        .exec(function(err, venues){
            res.send( (venues))
        })
})

// gets venues ids of explore 
router.get('/explore', function(req, res) {

    var queryString = "ramen"
    var queryArea = districts.sanMateo

    console.log("Get Explore ")

    VenueSchema
        .find( 
            {$and:[{district: {"$in": queryArea}},
            {category:{$regex: queryString, $options: 'i'}}
            ]})
        .limit(8)
        .lean()
        .exec(function(err, venues){

            // console.log(venues)
            res.send( (venues))

        })

})


module.exports = router;
