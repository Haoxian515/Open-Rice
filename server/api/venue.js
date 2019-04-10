const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const router = express.Router();

var client_id = "CJAEUX1GMIBXVPPWDHUEZ3GCRJHJJV1NSMI1RAGBFD0WFXA4"
var client_secret = "5WJC4UHCVN2XCBSN51U00RJ4YWRUPOB3U4IBKCPJDXPB4WMC"


router.get('/getdata', function(req, res) {
    console.log("hello 3001 getting data")
    // console.log(req.query)
    //foursquare api
    var queryString = req.query.input

    var getVenueIds = function(queryString){

        request({
            url: 'https://api.foursquare.com/v2/venues/search',
            method: 'GET',
                qs: {
                client_id: client_id,
                client_secret: client_secret,
                near: 'Chicago, IL' ,
                query: queryString,
                v: '20180323',
                limit: 10
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
                    // console.log(id)
                    // console.log(JSON.parse(body)["response"]["venues"])
                    // res.send(JSON.parse(body)["response"]["venues"])
                    // getVenueDetail(id)
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

//get venue detail
// https://api.foursquare.com/v2/venues/VENUE_ID


router.get("/venue_detail", function(req, res){
    // console.log("Getting venue photo")
        var venue_id = req.query.venue_id
        // console.log("from get venue detail " + venue_id)
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
            console.log("getting id")
            let venue_details = JSON.parse(body)["response"]
            // console.log(venue_details)
            res.send(venue_details)
        })

    // END GET VENUTE DETAIL
    // https://fastly.4sqi.net/img/general/ + width960 + /3554975_pgsbwDgSJAPrsxKUmcCU9w3yx_xpV71T820XKEG9Kso.jpg

    // https://fastly.4sqi.net/img/general/width960/40086548_PHU6G26hLdTtio15g9Hhaj0rgUnXrcig4b0gd7n9TQA.jpg
})

module.exports = router;
