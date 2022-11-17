const express=require("express");
const fetchuser = require("../middleware/fetchuser");
const router=express.Router()    //jo hum app.get ya app.post likhte hai ab vo hum router.get and router.post krke likhenge.
const Notes=require("../models/Notes")
const { body, validationResult } = require('express-validator'); //Data validation



//ROUTE 1 - Get all the routes using GET request /api/notes/fetchallnotes. Login Required.
router.get("/fetchallnotes",fetchuser,async (req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id}); //kyuki humne fetchuser vale middleware ko use kiya hai toh already req mai user or uski id hogi.
        res.json(notes)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error.")
    }
})


//ROUTE 2 - Add a new note using POST request /api/notes/addnotes. Login Required.
router.post("/addnotes",fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Enter a valid description of minimum 5 characters").isLength({ min: 5 }),
],async (req,res)=>{
    try {
        const {title,description,tag}=req.body; //Destructuring krke hum log body me se title description or tags bahar nikalre hai.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {  //agar errors empty nhi hai toh hum ek 400 bad request bhejenge aur jo errors hai unko bhejenge 
            return res.status(400).json({ errors: errors.array() });
        }
        const newnote=new Notes({
            title,description,tag,user:req.user.id
        })
        const savedNote=await newnote.save();
        res.json(savedNote)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error.")
    }
})

module.exports=router;
