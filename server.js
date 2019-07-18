const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


//MODULES
const venueRoute = require("./api/venue");

const cors = require('cors');

const TestSchema = require("./schema/testSchema")

const app = express();
const router = express.Router();
const port = process.env.PORT || 5000

app.use(cors())


// Set up mongodb
// const dbRoute = "mongodb://haoxian:M)M)club321@ds163905.mlab.com:63905/open_rice"
mongoose.connect(
    process.env.MONGODB_URI,
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

app.all('*', function(req, res, next) {
     var origin = req.get('origin'); 
     res.header('Access-Control-Allow-Origin', origin);
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
});

//APP USE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//ROUTE VENUE
app.use("/api", venueRoute);
// app.use("/addToMlab", mLabRoute)

app.post("/api/postdata", function(req,res){
    console.log("posting data ... ")
    // console.log(res)
    console.log(req.body["input"])
    // var newData = {
    //     "owner": "benson",
    //     "title": "olive juice"
    // }
    // TestSchema.create(newData, function(err, postedData){
    //     if(err){
    //         console.log(err);   
    //     }
    //     console.log("New data posted " + postedData);
    // })
    // res.redirect("/");
})

app.get("/", function(req, res){
    res.send("Server saying hello")
})


app.listen(port, () => {
    console.log("Server listening on port " + port);
})