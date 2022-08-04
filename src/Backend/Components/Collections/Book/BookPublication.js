const mongoose= require('mongoose');

const BookPublications=new mongoose.Schema({
    FID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'faculty'
    },
    BID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'book'  
    },
    Year:Date,
    CoAuthors:Array,
    Edition:String
})
const bookPublication=mongoose.model('bookPublication',BookPublications);
module.exports=bookPublication;