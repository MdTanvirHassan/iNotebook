const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create a User using : Post './api/auth/createUser'. Doesn't require auth. 
router.post('/createuser',[
    body('name','Enter a valid name.').isLength({ min: 3 }),
    body('email', 'Enter a valid email.'),
    // password must be at least 5 chars long
    body('password','password must be at least 5 chars long').isLength({ min: 5 }),
], async(req, res)=>{
    console.log(req.body);
    // const obj={
    //     a:'tanvir'
    // }
//    const user = User(req.body);
//    user.save()
//    res.send(req.body);
//    //res.send(obj);
//*If there is error, return bad request or error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    //* Check Whether the email is existing already
    try {
    
   let user = await User.findOne({email: req.body.email});
   if (user) {
    return res.status(400).json({ error: "Sorry, a user with this email already exist" })
   }
   //Create a new User
   user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    //     res.json({error: 'Enter a valid or another email address', message: err.message})
    // })
    res.json(user)
} catch (error) {
        res.status(500).send("Error Occurred. Please try again")
    }
    })


module.exports= router;