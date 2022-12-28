const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create a User using : Post './api/auth/'. Doesn't require auth. 
router.post('/',[
    body('name','Enter a valid name.').isLength({ min: 3 }),
    body('email', 'Enter a valid email.').isEmail(),
    // password must be at least 5 chars long
    body('password','password must be at least 5 chars long').isLength({ min: 5 }),
], (req, res)=>{
    console.log(req.body);
    // const obj={
    //     a:'tanvir'
    // }
//    const user = User(req.body);
//    user.save()
//    res.send(req.body);
//    //res.send(obj);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
    .catch(err => {console.log(err)
        res.json({error: 'Enter a valid email address', message: err.message})
    })
    })


module.exports= router;