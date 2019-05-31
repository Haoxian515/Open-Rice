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
const port = 3001 || process.env.PORT

app.use(cors())






// const client_id = "CJAEUX1GMIBXVPPWDHUEZ3GCRJHJJV1NSMI1RAGBFD0WFXA4"
// const client_secret = "5WJC4UHCVN2XCBSN51U00RJ4YWRUPOB3U4IBKCPJDXPB4WMC"

// // Set up mongodb
const dbRoute = "mongodb://haoxian:M)M)club321@ds163905.mlab.com:63905/open_rice"
mongoose.connect(
    dbRoute,
    {
        useNewUrlParser: true
    }
);
let db = mongoose.connection;
db.once("open", () => console.log("Connected to the database"));
// // checks if connection with the database is successful
// db.on("error", console.error.bind(console, "MongoDB connection error:"));


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


//ROUTE VENUE
app.use("/api", venueRoute);


// app.post("/api/postdata", function(req,res){
//     console.log("posting data ... ")
//     // console.log(res)
//     console.log(req.body["input"])

// })

app.get("/", function(req, res){
    res.send("Server saying hello")
})


app.listen(port, () => {
    console.log("Server listening on port " + port);
})