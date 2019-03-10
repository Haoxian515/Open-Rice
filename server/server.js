const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


const app = express();
const router = express.Router();
const port = 3000 || process.env.PORT


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



//APP USE
app.use("/api", router);

app.listen(port, () => {
    console.log("Server listening on port " + port);
})