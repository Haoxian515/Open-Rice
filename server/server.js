const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const cors = require('cors');

const TestSchema = require("./schema/testSchema")

const app = express();
const router = express.Router();
const port = 3001 || process.env.PORT

app.use(cors())

// Set up mongodb
const dbRoute = "mongodb://haoxian:M)M)club321@ds163905.mlab.com:63905/open_rice"
mongoose.connect(
    dbRoute,
    {
        useNewUrlParser: true
    }
);
let db = mongoose.connection;
db.once("open", () => console.log("Connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));


//CORS
// app.use(cors);
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//APP USE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/api/getdata', function(req, res) {
    console.log("hello 3001 getting data")
    //  TestSchema.find({}, (err, data) => {
    //     if(err){
    //         console.log(err)
    //     }else{
    //         // console.log("server side "  + data)
    //         return res.json({success: true, data: data}); 
    //     }
    // })

    //foursquare api
    var queryString = "coffee"
    const client_id = "CJAEUX1GMIBXVPPWDHUEZ3GCRJHJJV1NSMI1RAGBFD0WFXA4"
    const client_secret = "5WJC4UHCVN2XCBSN51U00RJ4YWRUPOB3U4IBKCPJDXPB4WMC"
    var data = null;
    request({
        url: 'https://api.foursquare.com/v2/venues/explore',
        method: 'GET',
        qs: {
          client_id: client_id,
          client_secret: client_secret,
          ll: '40.7243,-74.0018',
          query: queryString,
          v: '20180323',
          limit: 1
        }
    }, function(error, request, body) { 
            if (error) {
                console.error(error);
            } else {
                // console.log(body);
                res.send(JSON.parse(body)["response"]["groups"])
            }
        }
    );

});

app.post("/api/postdata", function(req,res){
    console.log("posting data ... ")
    var newData = {
        "owner": "benson",
        "title": "olive juice"
    }
    // TestSchema.create(newData, function(err, postedData){
    //     if(err){
    //         console.log(err);   
    //     }
    //     console.log("New data posted " + postedData);
    // })
    res.redirect("/");

})

app.get("/", function(req, res){
    res.send("Server saying hello")
})


app.listen(port, () => {
    console.log("Server listening on port " + port);
})