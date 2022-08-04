const mongoose = require('mongoose');

const Journal = new mongoose.Schema({ 
    Name: {
        type: String
    },
    Publisher: {
        type: String
    },
    ISSN:{
        type:String
    }
})
const journal = mongoose.model('journal', Journal);
module.exports = journal;