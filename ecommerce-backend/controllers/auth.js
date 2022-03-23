const user = require("../models/user");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };


exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec( (error, user) => {
            if (user) return res.status(400).json({ message: "User already exists" });
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
        if (error) {
            console.log(error);

            return res.status(400).json({ message: "Something went wrong" })
        }

        if (data) return res.status(200).json({ user: data });
    })
}

exports.signin = (req, res) => {
 
        User.findOne({email: req.body.email }).exec(async(error, user) => {
            if(error) return res.status(400).json({message: "Account doesn't exist"});
            if(user){
                const isPassword = await user.authenticate(req.body.password); 
                if(isPassword && user.role === "user") {
                    const token = generateJwtToken(user._id, user.role)
                    const {firstName, lastName, email, role, fullName} = user; //
                    res.status(200).json({
                        token, 
                       user:{
                        firstName, lastName, email, role, fullName
                       }
                    })
                } else { //
                    res.status(400).json({message: 'Invalid Password'})
                }
            } else { 
                res.status(400).json({message: "Something Went Wrong"})
            }
        })


}