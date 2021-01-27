const mongoose = require('mongoose');

let flightSchema = new mongoose.Schema({
    price:{
        type:String
    },
    source:{
        type:String
    },
    destination:{
        type:String
    },
    departureTime:{
        type:String,
    },
    arrivalTime: {
        type: String
    },
    returnDepartureTime:{
        type:String
    },
    returnArrivalTime: {
        type: String
    },


})

let Flight = mongoose.model("Flight",flightSchema)

module.exports=Flight