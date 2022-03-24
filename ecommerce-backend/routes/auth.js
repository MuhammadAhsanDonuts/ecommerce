const express = require('express');
const router = express.Router(); 
const User = require('../models/user');
const {signup, signin, verifySignin} = require('../controllers/auth')


router.post('/signup', signup); 
router.post('/signin', signin); 

router.post('/profile', verifySignin, (req, res) => {
    res.status(200).json({
        user: "profile"
    })
})

module.exports = router; 