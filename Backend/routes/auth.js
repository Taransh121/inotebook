const express = require("express");
const User = require("../models/User")
const router = express.Router()    //jo hum app.get ya app.post likhte hai ab vo hum router.get and router.post krke likhenge.
const { body, validationResult } = require('express-validator'); //Data validation
const bcrypt=require("bcryptjs");  
const jwt = require('jsonwebtoken');

const jwtSecret="70707"

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
        const salt=await bcrypt.genSalt(10);
        const securedPAssword=await bcrypt.hash(req.body.password,salt);
        newuser= await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPAssword,
        })
        const data={
            newuser:{
                id:newuser.id
            }
        }
        const authToken=jwt.sign(data,jwtSecret);
        res.json({authToken});   //ab jab bhi hum ek new user create krenge toh vo hume ek authToken provide krega jisko use krke hum vaps se us authToken ko convert kr skte hai us data mai aur apne secret ki help se we can check if anyone has tampered with it.We will check it using a function "jwt.verify()"
        // res.json(newuser)
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occurred")
    }})

module.exports = router;