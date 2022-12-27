            //Initializing Express

const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const hbs = require("hbs");



            //Using DB connection file        

require("./db/conn");

            //Configuring port

const port = process.env.PORT || 3000;
            
            //Configuring directories

const Users = require("./models/newUsers"); 
const Jobs = require("./models/newJobs");

const { Router } = require("express");
const { mongo } = require("mongoose");
const { assert } = require("console");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path))
hbs.registerPartials(partials_path)


            //Calling Files

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/login", (req, res) => {
    res.render("login.hbs");
})
app.get("/signup", (req, res) => {
    res.render("signup.hbs");
})
app.get("/Postjobs", (req, res) =>{
    res.render("Postjobs.hbs");
})
app.get("/JobFind", (req, res) => {
    res.render("JobFind.hbs");
});
app.get("/regHome", (req, res) => {
    res.render("regHome.hbs");
});
app.get("/Profile", (req, res) => {
    res.render("Profile.hbs");
});
app.get("/verify", (req, res) =>{
    res.render("verify.hbs")
})
app.get("/confirm", (req, res) =>{
    res.render("confirm.hbs")
})
            //Storing User Data in DB

app.post("/signup", async (req, res) => {
    try {
        const psw = req.body.psw;
        const cpsw = req.body.cpsw;

        if(psw === cpsw)
        {
            const newUser = new Users({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                psw: req.body.psw,
                cpsw: req.body.cpsw,
                drop: req.body.drop
            })

            const registered = await newUser.save();
            res.redirect("regHome")
        } 
        else
        {
            res.send("Passwords don't match!")
        }

    } catch (error) {
        res.status(400).send(error)
    }
})

app.post("/Postjobs", function(req, res) {
    let newPost = new Jobs({
        jobTitle: req.body.jobTitle,
        jobType: req.body.jobType,
        contactEmail: req.body.contactEmail,
        phoneNum: req.body.phoneNum,
        compName: req.body.compName,
        sectorName: req.body.sectorName,
        descript: req.body.descript
    });
    const posted = newPost.save();
    res.redirect("JobFind")
})

            //Calling And Validating User Data

app.post("/logIN", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
       
        const userEmail = await Users.findOne({email:email});
        if(userEmail.psw === password){
            res.redirect("regHome")
        } else{
            res.send("Email or Password not correct");
        }

    } catch (error) {
        res.status(400).send(error)
    }
})

//Fetching Data to display
app.get("/get-data", async(req, res, next) =>{
    let jobPostResult = await Jobs.find({}).exec((err, jobPostResult) =>{
        if (jobPostResult) {
            res.render("JobFind", {data:jobPostResult});
        }
    })
});

app.post("/verify",  async(req, res, next) => {
    const email = req.body.email;
    let profileResult = await Users.findOne({email:email}).exec((err, profileResult) =>{
        if(profileResult) {
            res.render("Profile", {data:profileResult});
        }
    })
});

//Console message for specifying port

app.listen(port, ()=>{
    console.log(`server is running at port no. ${port}`);
});