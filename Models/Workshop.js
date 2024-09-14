//INCLUDING NEEDED APIS AND MODULES
const mongoose = require("mongoose")

//Defines a new Workshop Schema
const workshopBookingsSchema = new mongoose.Schema({
    
    fname: {
        type: String,
        required: true
    },

    lname: {
        type: String,
        required: true
    },

    email: {
         type: String,
         required: true
     },

     phNo: {
        type: Number,
        required: true
    },


    dateOfWorkshop: {
        type: Date,
        required: true
     },

     timeofWorkshop: {
        type: String,
        required: true
     },

    card_number: {
        type: Number,
        required: true
    },

    card_cvv: {
        type:Number,
        required: true 
     },

     card_expiry_date: {
        type: Date,
        required: true
     
    },

 

},
{timestamps: true}
);


//Exports the model to be used elsewhere (workshops router)
var Workshop = mongoose.model("Workshop", workshopBookingsSchema)
module.exports = Workshop