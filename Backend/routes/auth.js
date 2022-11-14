const express=require("express");
const User=require("../models/User")
const router=express.Router()    //jo hum app.get ya app.post likhte hai ab vo hum router.get and router.post krke likhenge.

//Create a user using POST "api/auth/" , Doesnt require auth.
router.post("/",(req,res)=>{
    //printing user's body-
    console.log(req.body);
    //Creating a new user-
    const newuser=User(req.body);
    //saving the user to the database-
    newuser.save();
    //sending user's body as response-
    res.send(req.body)
})

module.exports=router;