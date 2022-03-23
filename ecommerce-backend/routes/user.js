const express = require('express');
const router = express.Router(); //
const User = require('../models/user');
const bcrypt = require('bcrypt');



router.post('/signup', (req, res) => {
    User.findOne({ email: req.body.email})
    .exec(async (error, user) => {
        if(user) return res.status(400).json({ message: "User already exists"}); 
    })    

        const {
            firstName, lastName, email, password, 
        } = req.body; 
    
        const _user = new User({
            firstName, 
            lastName,
            email,
            password,
            username: Math.random().toString()
        })
        _user.save((error, data) => {
            if(error){ 
                console.log(error);
                
                return res.status(400).json({message: "Something went wrong"})
            }
             
            if (data) return res.status(200).json({user: data}); 
        })


})

module.exports = router; 