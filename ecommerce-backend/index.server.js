const express = require('express');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const userRouter = require('./routes/user')

//Environment variables accessible. 
dotenv.config(); 

mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.t0icl.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
     ).then(() => {
        console.log('Database Connection established')
    }
    )

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'Are you here to get something?'
//     } 
//     )
// })

//Middleware for parsing the data. 
app.use(bodyParser.json()); 
app.use('/api', userRouter)

//Server is running here |
//                       V
app.listen(process.env.PORT, () => {
    console.log(`Server is running at PORT:${process.env.PORT}`);
})

