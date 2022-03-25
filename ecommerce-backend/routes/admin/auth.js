const express = require('express');
const router = express.Router(); 

const {signup, signin} = require('../../controllers/admin/auth')


router.post('/admin/signup', signup); 
router.post('/admin/signin', signin); 

// router.post('/profile', verifySignin, (req, res) => {
//     res.status(200).json({
//         user: "profile"
//     })
// })

module.exports = router; 