const express = require("express") // imports express
const router = express.Router(); // uses express router function

//Route redirects to home page
router.get("/", (req,res)=>{
    res.render("home")
}
)

//Renders about us page
router.get("/aboutUs", (req,res)=>{
    res.render("aboutUs")
})

//Renders help page
router.get("/help", (req,res)=>{
    res.render("help")
})


module.exports = router; // exports module