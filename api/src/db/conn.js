const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/webProg", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log(`Connection Successful`);
}).catch((error)=>{
    console.error("Connection Failed", error.message);
})


