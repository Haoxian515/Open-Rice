const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const router = express.Router();

var client_id = "1YRBX0IWIB41CHKIVFKMTDDWTT0MNDDPZZRIY4E4CQ01FQ4J"
var client_secret = "SAXOTPI4QTRHPUZOE0ZT3L12YX5ABI3UMRCMRZFENSG53RNI"

// GET DATA// GET DATA// GET DATA
// GET DATA// GET DATA// GET DATA
// GET DATA// GET DATA// GET DATA

router.get("/quick_test", function(req, res){
    request({
        url: 'https://api.foursquare.com/v2/venues/search',
        method: 'GET',
            qs: {
            client_id: client_id,
            client_secret: client_secret,
            near: "San Francisco, CA" ,
            query: "Coffee",
            v: '20180323',
            limit: 5
            }
    }, function(err, request, body){
        console.log(body)
        res.send(JSON.parse(body))
    })
})

router.get('/get_venueIDs', function(req, res) {
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
                limit: 2
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


//create functions venue detail set up venue
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
            let venue_details_response = {
                "name": venue_details["name"],
                "formattedAddress": venue_details["location"]["formattedAddress"],
                "bestPhoto": venue_details["bestPhoto"]["prefix"] + "400x400" + venue_details["bestPhoto"]["suffix"],
                "priceRange": venue_details["attributes"]["groups"][0]["summary"],
                "categories": venue_details["categories"]

            }
            res.send(venue_details_response)

            // venue_details["name"]
            // venue_details["location"]["formattedAddress"] //array of address
            // venue_details["bestPhoto"]["prefix"] + 
            //                     "400x400" + 
            //                     response.data["bestPhoto"]["suffix"]
            // venue_details["attributes"]["groups"][0]["summary"] // price
            // venue_details["categories"] //array 
        })

    // END GET VENUTE DETAIL
    // https://fastly.4sqi.net/img/general/ + width960 + /3554975_pgsbwDgSJAPrsxKUmcCU9w3yx_xpV71T820XKEG9Kso.jpg

    // https://fastly.4sqi.net/img/general/width960/40086548_PHU6G26hLdTtio15g9Hhaj0rgUnXrcig4b0gd7n9TQA.jpg
})




// gets venue ids for whats hot
router.get('/getMain', function(req, res) {
    request({
        url: 'https://api.foursquare.com/v2/venues/search',
        method: 'GET',
            qs: {
            client_id: client_id,
            client_secret: client_secret,
            near: "San Francisco, CA" ,
            query: "Ramen",
            v: '20180323',
            limit: 5
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
})

// gets venues ids of explore 
router.get('/explore', function(req, res) {
    // res.send("trending place holder")
    request({
        url: 'https://api.foursquare.com/v2/venues/explore',
        method: 'GET',
            qs: {
            client_id: client_id,
            client_secret: client_secret,
            near: "San Francisco, CA" ,
            v: '20180323',
            limit:8
            }
    },function(error, request, body) { 
        if (error) {
            console.error(error);
        } else {
            let whatsTrendingList = []
            //returns arr
            let responseArr = JSON.parse(body)["response"]["groups"][0]["items"]
            for(let item of responseArr){
                // console.log(item["venue"]["name"])
                let id = item["venue"]["id"]
                // let name = item["venue"]["name"]
                // let formattedAddress = item["venue"]["location"]["formattedAddress"]
                // let venue = {
                //     id:id,
                //     name:name,
                //     formattedAddress,formattedAddress
                // }
                whatsTrendingList.push(id)
            }
            
            res.send(whatsTrendingList)
        }
    })
})


module.exports = router;
