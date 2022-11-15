const express = require("express");
const User = require("../models/User")
const router = express.Router()    //jo hum app.get ya app.post likhte hai ab vo hum router.get and router.post krke likhenge.
const { body, validationResult } = require('express-validator'); //Data validation

//Create a user using POST "api/auth/createuser" , Doesnt require auth.
router.post("/createuser", [
    //Is array ke andar hum apne saare validations likhenge.
    // email must be an email
    body('email',"Enter a valid email").isEmail(),
    // name must be at least 3 chars long
    body('name',"Enter a valid name").isLength({ min: 3 }),
    // password must be at least 5 chars long
    body('password',"Password must be atleast 5 characters").isLength({ min: 5 }),

],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {  //agar errors empty nhi hai toh hum ek 400 bad request bhejenge aur jo errors hai unko bhejenge 
      return res.status(400).json({ errors: errors.array() });
    }
    //Check weather the user with same email already exists
    try {
        let newuser=await User.findOne({email:req.body.email});  //It finds if the email already exists or not
        if(newuser){
            return (res.status(400).json({error:"Sorry a user with this email already exists"}))  //If email alr exists it gives this response .
        }
        newuser= await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json(newuser)
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occurred")
    }})

module.exports = router;