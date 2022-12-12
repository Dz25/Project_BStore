const express = require('express')
const User = require('../models/User')
const users = require("../users.js")

const userRouter = express.Router();


userRouter.get('/seed', async(req,res) => {
    const createdUsers = await User.insertMany(users);
    res.send(JSON.stringify(createdUsers));
})


userRouter.post("/signin", async(req,res) => {
    const user = await User.findOne({email: req.body.email});

    if(user){
        if(req.body.password == user.password){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                
            });
            return;
        }
    }
    res.status(404).send({message: "Invalid email or password."});
})



userRouter.post("/signup", async (req,res) => {
    const user  = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin : false
    });


    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        
    })
});


userRouter.get('/:id', async(req,res) => {
    const user = await User.findById(req.params.id);

    if(user){
        res.send(user);
    }
    else{
        res.status(404).send({
            message: 'User not found'
        })
    }
});






module.exports = userRouter