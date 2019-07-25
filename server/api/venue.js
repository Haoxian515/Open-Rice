const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const VenueSchema = require("../schema/venueSchema");
const VenueDetailSchema = require("../schema/venueDetailsSchema")
const districts = require("../districts/districts")


const router = express.Router();

var client_id = "MDWISIUTE4DJVG5HTTBONENXTVRO41TUKFYLVJ0DMBRQYKZM"
var client_secret = "ED1AYFEPPOBFOUV4KF33ONJUH2Q5BITN0JSBWBQLNLK5UAFI"

// GET DATA// GET DATA// GET DATA
// GET DATA// GET DATA// GET DATA
// GET DATA// GET DATA// GET DATA

router.get("/connecttest", function(req, res){
    res.send("CONNECTINO WORKS")
})

router.get("/all", function(req, res){
    VenueSchema
    .find(
        {district: {"$in": districts.berkeley}}
    )
    .lean()
    .exec(function(err, venues){
        // console.log(venues)

        let result = []
        // var detail = {
        //     "_id" : "",
        //     "title": ""
        // }
        for(ele of venues){
            let detail = {
                "_id" : "",
                "title": "",
                "area": "Berkeley"
            }
            detail["_id"] = ele["_id"];
            detail["title"] = ele["title"]
            result.push(detail)
        }
        res.send(result)
    })
})

router.get("/search_restaurants", function(req, res){

    var queryString = req.query.input
    var queryArea = req.query.queryArea




    console.log("search_restaurants")
    console.log(queryString)
    console.log(queryArea)
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
            {$or:[
                {$and:[
                    {district: {"$in": searchDistrict}},
                    {category:{$regex: queryString, $options: 'i'}},
                ]},
                {$and:[
                    {district: {"$in": searchDistrict}},
                    {title:{$regex: queryString, $options: 'i'}},
                ]},
            ]}
            )
        .lean()
        // .limit(10)
        // .skip(10)
        .exec(function(err, venues){

            console.log(venues)
            res.send( (venues))

        })

})


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

    //Random query + district
    let queryArr = ["brunch", "dessert", "coffee", "noodles", "dim sum"]
    let districtAll = districts.all
    let queryString = ""
    queryString = queryArr[Math.floor( Math.random() * queryArr.length) ]
    queryArea = districtAll[Math.floor( Math.random() * districtAll.length) ]

    switch(queryArea){
        case districts.berkeley:
            queryArea = districts.berkeley;
            break
        case districts.sanFrancisco:
            queryArea = districts.sanFrancisco;
            break;
        case districts.sanMateo:
            queryArea = districts.sanMateo;
            break
        default:
            queryArea = districts.sanFrancisco

    }

    // queryArea = areaArr[0]
    // console.log(districtAll.length);
    // console.log(districtAll);
    // console.log(queryArea);
    // console.log(queryString);

    // debugger
    // console.log("Get Explore ")

    VenueSchema
        .find( 
            {$and:[{district: {"$in": queryArea}},
            {category:{$regex: queryString, $options: 'i'}}
            ]})
        .limit(8)
        .lean()
        .exec(function(err, venues){
            // console.log("Explore response")
            // console.log(venues)
            res.send( (venues))

        })

})


router.get("/venue_details", function(req, res){
    console.log("hello id route")
    // console.log(req.params)

    // let tempID = "5d0aef3ae137f31dcd1643c9"

    let venue_id = req.query.venue_id
    VenueDetailSchema.findById(venue_id, function (err, details){
        if(err){
            console.log("VENUE DETAIL NOT FOUND")
            res.send({
                "venue_photos" : "SORRY NOT FOUND",
                "venue_reviews": "SORRY NOT FOUND"
            })
        }
        console.log("VENUE DETAIL FOUND")
        if(details === null){
            res.send({})
        }else{
            res.send(details)
        }
    });
})


module.exports = router;
