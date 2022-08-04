const mongoose= require('mongoose');

const JournalPublications=new mongoose.Schema({
    FID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'faculty'
    },
    JID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'journal'  
    },
    Year:Date,
    CoAuthors:{
        type:Array
    },
    Volume:String,
    PaperTitle:String
})
const journalPublication=mongoose.model('journalPublication',JournalPublications);
module.exports=journalPublication;