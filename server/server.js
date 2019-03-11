const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const TestSchema = require("./schema/test")

const app = express();
const router = express.Router();
const port = 3001 || process.env.PORT


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


app.get('/', function(req, res) {
    console.log("hello 3001")
     TestSchema.find({}, (err, data) => {
        if(err){
            console.log(err)
        }else{
            console.log("server side "  + data)
            return res.json({success: true, data: data}); 
        }
    })
});

// router.get("/api/getData", (req, res)=>{
//     TestSchema.find((err, data) => {
//         if(err){
//             console.log(err)
//         }else{
//             console.log("server side "  + data)
//             return res.json({success: true, data: data}); 
//         }
//     })
// })

app.listen(port, () => {
    console.log("Server listening on port " + port);
})