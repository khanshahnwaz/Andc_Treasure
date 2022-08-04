const mongoose = require('mongoose');

const Conference = new mongoose.Schema({ 
    Name: {
        type: String
    },
    Organizer: {
        type: String
    },
    CID:{
        type:String
    }
})
const conference = mongoose.model('conference', Conference);
module.exports = conference;