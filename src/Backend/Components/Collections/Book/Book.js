const mongoose = require('mongoose');

const Book = new mongoose.Schema({ 
    Name: {
        type: String
    },
    Publisher: {
        type: String
    },
    ISBN:{
        type:String
    }
})
const book = mongoose.model('book', Book);
module.exports = book;