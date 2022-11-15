const express = require("express");
const User = require("../models/User")
const router = express.Router()    //jo hum app.get ya app.post likhte hai ab vo hum router.get and router.post krke likhenge.
const { body, validationResult } = require('express-validator'); //Data validation

//Create a user using POST "api/auth/" , Doesnt require auth.
router.post("/", [
    //Is array ke andar hum apne saare validations likhenge.
    // email must be an email
    body('email',"Enter a valid email").isEmail(),
    // name must be at least 3 chars long
    body('name',"Enter a valid name").isLength({ min: 3 }),
    // password must be at least 5 chars long
    body('password',"Password must be atleast 5 characters").isLength({ min: 5 }),

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {  //agar errors empty nhi hai toh hum ek 400 bad request bhejenge aur jo errors hai unko bhejenge 
      return res.status(400).json({ errors: errors.array() });
    }
    //Creating a user
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user)) //Sending user's data as response
      .catch((error)=>{   //Catching an error if it occurs due to already present email address.
        console.log(error);
        res.json({error:"Please enter a unique email."})
    });
})

module.exports = router;