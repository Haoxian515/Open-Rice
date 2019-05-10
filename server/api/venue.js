const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const router = express.Router();

var client_id = "AJJZGK4GMWAL4QUAYG4VEP32SVNWSJRP0SWFZA0HRYOMF3HW"
var client_secret = "1W52K4CPPW11WZQSMMWNJG1HG3XAU5Q3COMR5RAKZOWUJEZ0"

// GET DATA// GET DATA// GET DATA
// GET DATA// GET DATA// GET DATA
// GET DATA// GET DATA// GET DATA


router.get('/getdata', function(req, res) {
    console.log("hello 3001 getting data")
    // console.log(req.query)
    //foursquare api
    var queryString = req.query.input
    var queryArea = req.query.queryArea
    console.log(req.query)
    var getVenueIds = function(queryString){

        request({
            url: 'https://api.foursquare.com/v2/venues/search',
            method: 'GET',
                qs: {
                client_id: client_id,
                client_secret: client_secret,
                near: queryArea ,
                query: queryString,
                v: '20180323',
                limit: 1
                }
        }
        ,function(error, request, body) { 
                if (error) {
                    console.error(error);
                } else {
                    let id = (JSON.parse(body)["response"]["venues"][0]["id"])
                    let id_json = JSON.parse(body)["response"]["venues"];
                    let ids = []
                    // console.log(id_json)
                    id_json.forEach(element => {
                        // console.log(element["id"])
                        ids.push(element["id"])
                    });
                    // console.log(ids)
                    res.send(ids)
                }
            }
        );
    }
    

    console.log("current query string " + queryString)
    if(queryString !== undefined){
        getVenueIds(queryString)
    }else{
        res.send("Error")
    }
});
// GET DATA// GET DATA// GET DATA
// GET DATA// GET DATA// GET DATA
// GET DATA// GET DATA// GET DATA






//get venue detail
// https://api.foursquare.com/v2/venues/VENUE_ID


router.get("/venue_detail", function(req, res){
    
        var venue_id = req.query.venue_id
        request({
            url: 'https://api.foursquare.com/v2/venues/' + venue_id,
            method: 'GET',
                qs: {
                client_id: client_id,
                client_secret: client_secret,
                v: '20180323',
                VENUE_ID: venue_id
                }
        }, function(error , request, body){
            let venue_details = JSON.parse(body)["response"]["venue"]
            res.send(venue_details)
        })

    // END GET VENUTE DETAIL
    // https://fastly.4sqi.net/img/general/ + width960 + /3554975_pgsbwDgSJAPrsxKUmcCU9w3yx_xpV71T820XKEG9Kso.jpg

    // https://fastly.4sqi.net/img/general/width960/40086548_PHU6G26hLdTtio15g9Hhaj0rgUnXrcig4b0gd7n9TQA.jpg
})

module.exports = router;