const mongoose= require('mongoose');

const ConferencePublications=new mongoose.Schema({
    FID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'faculty'
    },
    CID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'conference'  
    },
    Year:Date,
    CoAuthors:{
        type:Array
    },
    Proceedings:String,
    PaperTitle:String
})
const conferencePublication=mongoose.model('conferencePublication',ConferencePublications);
module.exports=conferencePublication;