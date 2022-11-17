const express = require("express");
const User = require("../models/User")
const router = express.Router()    //jo hum app.get ya app.post likhte hai ab vo hum router.get and router.post krke likhenge.
const { body, validationResult } = require('express-validator'); //Data validation
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser=require("../middleware/fetchuser")

const jwtSecret = "70707"

//ROUTE 1 - Create a user using POST "api/auth/createuser" , Doesnt require auth.
router.post("/createuser", [
    //Is array ke andar hum apne saare validations likhenge.
    // email must be an email
    body('email', "Enter a valid email").isEmail(),
    // name must be at least 3 chars long
    body('name', "Enter a valid name").isLength({ min: 3 }),
    // password must be at least 5 chars long
    body('password', "Password must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {  //agar errors empty nhi hai toh hum ek 400 bad request bhejenge aur jo errors hai unko bhejenge 
        return res.status(400).json({ errors: errors.array() });
    }
    //Check weather the user with same email already exists
    try {
        let newuser = await User.findOne({ email: req.body.email });  //It finds if the email already exists or not
        if (newuser) {
            return (res.status(400).json({ error: "Sorry a user with this email already exists" }))  //If email alr exists it gives this response .
        }
        const salt = await bcrypt.genSalt(10);
        const securedPAssword = await bcrypt.hash(req.body.password, salt);
        newuser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPAssword,
        })
        const data = {
            newuser: {
                id: newuser.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ authToken });   //ab jab bhi hum ek new user create krenge toh vo hume ek authToken provide krega jisko use krke hum vaps se us authToken ko convert kr skte hai us data mai aur apne secret ki help se we can check if anyone has tampered with it.We will check it using a function "jwt.verify()"
        // res.json(newuser)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error.")
    }
})


//ROUTE 2 - Authenticate a user using POST "api/auth/login" , No login required.
router.post("/login", [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists(),
],
    async (req, res) => {
        //If there are errors then return a bad request and return the array of errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {  //agar errors empty nhi hai toh hum ek 400 bad request bhejenge aur jo errors hai unko bhejenge 
            return res.status(400).json({ errors: errors.array() });
        }
        //In ideal case there wont be an error and user will provide the email and password,we will fetch it here-
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email }); //Check if the email which is entered by the user exists or not in our database.
            if (!user) {
                //If user does not exists
                return (res.status(400).json({ error: "Login with correct credentialss" }))
            }
            const passwordCompare = await bcrypt.compare(password, user.password) //We are comparing the pw which is entered by the user and its original pw.It returns true or false.
            if (!passwordCompare) {
                //If pw does not matches
                return (res.status(400).json({ error: "Login with correct credentials" }))
            }
            //If pw is correct.
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            res.json({ authToken });

        } catch (error) {
            console.log(error);
            res.status(500).send("Internal server error.")
        }
    })
//ROUTE 3 - Get logged in user details using POST "api/auth/getuser" , Login required.
router.post("/getuser", fetchuser, async (req, res) => {
        try {
            const userId=req.user.id;
            const user=await User.findById(userId).select("-password") //Iska ye mtlb hai ki jab hume user miljyega toh hum uski har field ko select kr skte hai except uske pw ke.
            res.json({user})
            
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal server error.")
        }

    })


module.exports = router;