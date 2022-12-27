const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobTitle : { 
        type:String,
        required:true
    },
    jobType : { 
        type:String,
        required:true
    },  
    contactEmail : { 
        type:String,
        required:true,
    },
    phoneNum : {
        type: Number,
        required: true,
    },
    compName : {
        type: String,
        required: true,
    }, 
    sectorName: {
        type: String,
        required: true,
    },
    descript: {
        type: String,
        required: true,
    }

})

const Jobs = new mongoose.model("Jobs", jobSchema);
module.exports= Jobs;
