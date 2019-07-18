const mongoose = require("mongoose");

var TestSchema = new mongoose.Schema({

    owner: { 
        type: String
    },
    title: { 
        type: String
    },
    description: { 
        type: String
    }
},
    { 
        collection: 'open_rice' 
    }
)

var Test = mongoose.model('test', TestSchema);
module.exports = Test;