const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : { 
        type:String,
        required:true
    },
    lastName : { 
        type:String,
        required:true
    },  
    email : { 
        type:String,
        required:true,
        unique:true
    },
    psw: {
        type: String,
        required: true,
    },
    cpsw: {
        type: String,
        required: true,
    }, 
    drop: {
        type: String,
        required: true,
    }
})

const Users = new mongoose.model("Users", userSchema);
module.exports= Users;




