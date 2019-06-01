const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const VenueSchema = require("../schema/venueSchema");



const router = express.Router();

var client_id = "1YRBX0IWIB41CHKIVFKMTDDWTT0MNDDPZZRIY4E4CQ01FQ4J"
var client_secret = "SAXOTPI4QTRHPUZOE0ZT3L12YX5ABI3UMRCMRZFENSG53RNI"

// GET DATA// GET DATA// GET DATA
// GET DATA// GET DATA// GET DATA
// GET DATA// GET DATA// GET DATA


router.get('/quick_test', function(req, res) {
    // console.log("JESUS CHRIST")
    let data = [
        "58a8fc412321c67cca7ee144",
        "5632c07e498eaa6c566acefc",
        "4c228972fbe5c9b6ed0e9a21",
        "52b63dac498ec85aee861620",
        "4d8eabc7d265236af9a71017"
    ]
    res.send(data)
})

function saveVenueToDB( newVenuObj ){
    var Venue = mongoose.model("Venue", VenueSchema);
    var newVenue = new Venue( newVenuObj ) 
    newVenue.save( function(err, data){
        if(err){
            console.log(err)
        }else{
            console.log("New Venue saved to db")
        }
    })

}

function getVenueFromDB( venue_id ){
    var Venue = mongoose.model("Venue", VenueSchema);
    Venue.findById(venue_id, function(err, data){
        return data;
    })
}

function venueExistInDB( venue_id ){
    var Venue = mongoose.model("Venue", VenueSchema);
    // let dummyVenue =  new Venue({
    //     _id: 1234567,
    //     name: "Test",
    //     address: "123 Fake Street",
    //     bestPhoto: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    //     attributes:"Filler",
    //     categories:["a","b","c"]
    // })

    //if find use else query load from 4square api

    // findbyid
    Venue.findById( venue_id , function(err, venue){
        if(err){
            console.log(err)
        }else if(venue != null){
            // if id exists return found venue
            console.log(venue)
            return true;
        }else{
            return false;
        }
    })

    // find all in venue doc
    // Venue.find({}, function(err, data){
    //     if(err){
    //         console.log(err)
    //     }else if(data.length < 1){
    //         console.log("No data found")
    //     }else{
    //         console.log(data)
    //     }
    // })

    // save to db
    // dummyVenue.save(function(err){
    //     if(err){
    //         console.log("someerr " + err)
    //     }else{
    //         console.log("Document saved")
    //     }
    // })
}


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
    
    // if id exits in mlab call from mlab else make request and format and add to mlab

    var venue_id = req.query.venue_id
    // console.log(req.query)
    if( venueExistInDB(venue_id) ){
        res.send( getVenueFromDB() )
    }else{
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
            console.log(venue_details)
            let venue_details_formatted = {
                "name": venue_details["name"],
                "formattedAddress": venue_details["location"]["formattedAddress"],
                "bestPhoto": venue_details["bestPhoto"]["prefix"] + "400x400" + venue_details["bestPhoto"]["suffix"],
                "priceRange": venue_details["attributes"]["groups"][0]["summary"],
                "categories": venue_details["categories"]

            }

            saveVenueToDB( venue_details_formatted )

            res.send(venue_details_formatted)

            // venue_details["name"]
            // venue_details["location"]["formattedAddress"] //array of address
            // venue_details["bestPhoto"]["prefix"] + 
            //                     "400x400" + 
            //                     response.data["bestPhoto"]["suffix"]
            // venue_details["attributes"]["groups"][0]["summary"] // price
            // venue_details["categories"] //array 
        })
    }




    // END GET VENUTE DETAIL
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
