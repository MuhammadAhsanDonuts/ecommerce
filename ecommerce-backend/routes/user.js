const express = require('express');
const router = express.Router(); 
const User = require('../models/user');
const {signup, signin} = require('../controllers/auth')


router.post('/signup', signup); 

router.post('/signin', signin); 

module.exports = router; 