const mongoose = require('mongoose');
const connection =  () => {
    const connect =  mongoose.connect("mongodb://localhost:27017/andc_treasure")
    if (connect) {
        console.log("Connection successfull.")
    } else {
        console.log('Failed to establish connection.')
    }
}
module.exports=connection;