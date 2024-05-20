const express = require('express');
const router = express.Router();
const z = require('zod')
const {User} = require('../db.js');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config.js');

const signupBody = zod.object({
    first_name: z.string(),
    last_name: z.string(),
    username: z.string().email(),
    password: z.string(),
})

router.post('/signup', async (req, res) => {
    const {success} = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({error: "Invalid inputs"});
    }

    const existingUser = await User.findOne({username: req.body.username});

    if(existingUser) {
        return res.status(400).json({error: "Username already taken"});
    }

    const user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
    });

    const userId = user._id;

    const token = jwt.sign({userId}, JWT_SECRET);

    res.json({message: "User created successfully",
        token});

})

const signinBody = zod.object({
    username: z.string().email(),
    password: z.string(),

})

router.post('/signin', async (req, res) => {
    const {success} = signinBody.safeParse(req.body);

    if(!success) {
        return res.status(400).json({error: "Invalid inputs"});
    }

    const existingUser = await User.findOne({username: req.body.username, password: req.body.password});

    if(!existingUser) {
        return res.status(400).json({error: "Invalid credentials"});
    }

    const userId = existingUser._id;

    const token = jwt.sign({userId}, JWT_SECRET);

    res.json({message: "User signed in successfully",
        token});
})

module.exports = router;