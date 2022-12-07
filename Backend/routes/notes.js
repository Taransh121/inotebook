const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router()    //jo hum app.get ya app.post likhte hai ab vo hum router.get and router.post krke likhenge.
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator'); //Data validation
const { request } = require("express");



//ROUTE 1 - Get all the routes using GET request /api/notes/fetchallnotes. Login Required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id }); //kyuki humne fetchuser vale middleware ko use kiya hai toh already req mai user or uski id hogi.
        res.json(notes)
    } catch (error) {
        console.log(error);
        success=false;
        res.status(500).send(success,"Internal server error.")
    }
})


//ROUTE 2 - Add a new note using POST request /api/notes/addnotes. Login Required.
router.post("/addnotes", fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Enter a valid description of minimum 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body; //Destructuring krke hum log body me se title description or tags bahar nikalre hai.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {  //agar errors empty nhi hai toh hum ek 400 bad request bhejenge aur jo errors hai unko bhejenge 
            success=false;
            return res.status(400).json({success, errors: errors.array() });
        }
        const newnote = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await newnote.save();
        res.json(savedNote)
    } catch (error) {
        console.log(error);
        success=false;
        res.status(500).send(success,"Internal server error.")
    }
})

module.exports = router;

//ROUTE 3 - Update an existing note PUT request /api/notes/updatenote. Login Required.Also the id of the note which we want to update is required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Create a new note object
        const newNote = {};
        if (title) { newNote.title = title }; //Agar title arha hai naya toh usko newNote ke title ke equal krdo.
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
    
        //find the note to be updated and update it.
        let note = await Notes.findById(req.params.id); //Ab ye vahi note hai jiski upar endpoint me id given hai.
        if (!note) {
            success=false;
            return res.status(404).send(success,"Note not found")
        }
        if (note.user.toString() != req.user.id) //Agar jiska note hai vo user aur jo user request send krra hai dono same nhi hai toh koi hack krna chahra hai.
        {
            success=false;
            return res.status(401).send(success,"Not allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote })
        res.json({ note })
    } catch (error) {
        console.log(error);
        success=false;
        res.status(500).send(success,"Internal server error.")
    }
})
// ROUTE 4 - Delete an exisiting note using DELETE request /api/notes/deletenote. Login required.Also the id of the note which we want to update is required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //find the note to be updated and delete it.
        let note = await Notes.findById(req.params.id); //Ab ye vahi note hai jiski upar endpoint me id given hai.
        if (!note) {
            success=false;
            return res.status(404).send(success,"Note not found")
        }
        //Allow deleteion only if user owns this note.
        if (note.user.toString() != req.user.id) //Agar jiska note hai vo user aur jo user request send krra hai dono same nhi hai toh koi hack krna chahra hai.
        {
            success=false;
            return res.status(401).send(success,"Not allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted" })
    } catch (error) {
        console.log(error);
        success=false;
        res.status(500).send(success,"Internal server error.")
    }
})