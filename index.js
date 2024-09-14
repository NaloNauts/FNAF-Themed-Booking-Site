//THIS IS THE ENTRY POINT FOR THE SERVER. NPM RUN START RUNS THIS FILE
//-----------------------------------------------------------------------------------------------------------------------------------------------

//INCLUDING NEEDED APIS AND MODULES
const express = require("express") //imports express
const app = express() //sets app to be the express engine
var path = require('path'); //imports path module, used for accessing content from directories
app.set('view engine', 'ejs') //sets view engine to use ejs
app.use(express.json()) //allows json files to be used
const mongoose = require("mongoose") //imports mongoose API
const dotenv = require("dotenv") //imports dotenv, used for getting DB key from env file
dotenv.config() //configures env files 
const Workshop = require("./Models/Workshop"); // imports Workshop Model from Models Folder
app.use(express.urlencoded({ extended: true })); //used for form submissions
app.use(express.static(path.join(__dirname, 'public'))); //sets up the location for all images, stylesheets. etc


const homeroute = require("./routes/home") //imports the homepage.js router
const workshopsroute = require("./routes/workshops");//imports the workshops.js router

 
//Function to attempt connection to Workshops Database
//if connection is successful a message will be logged to the console
const connect = async ()=> {
try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database Connection Successful")
    } catch (error) {
      throw error;
    } 
};



app.use("/", homeroute) //Directs to Homepage.js immediately
app.use("/workshops", workshopsroute) //uses /workshop router for workshop related requests



//Sets up Server on port 3000, prints a message if successful 
//Also calls the mongodb connect function
app.listen(3000, ()=>
{   
    console.log("Backend Connected!")
    connect()
})




