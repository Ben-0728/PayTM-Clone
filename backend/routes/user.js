const express = require('express');
const router = express.Router();
const z = require('zod')
const {User, Account} = require('../db.js');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config.js');
const authMiddleware = require('../middleware.js');

const signupBody = z.object({
    first_name: z.string(),
    last_name: z.string(),
    username: z.string().email(),
    password: z.string(),
})

router.post('/signup', async (req, res) => {
    const result = signupBody.safeParse(req.body);
    if (!result.success) {
        console.log(result.error.errors);
        return res.status(400).json({error: "Invalid inputs"});
    }

    const existingUser = await User.findOne({username: req.body.username});

    if(existingUser) {
        return res.status(400).json({error: "Username already taken"});
    }

       const first_name = req.body.first_name
       const last_name = req.body.last_name
       const username = req.body.username
       const password = req.body.password
    console.log(first_name, last_name, username, password);
    const user = await User.create({
        first_name,
        last_name,
        username,
        password
    });

    console.log(user);

    await Account.create({
        userId: user._id,
        balance: 1 + Math.random() * 10000,
    });

    const userId = user._id;

    const token = jwt.sign({userId}, JWT_SECRET);

    res.json({message: "User created successfully",
        token});

})

const signinBody = z.object({
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

const updateBody = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    password: z.string().optional(),
})

router.put('/', authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse(req.body);
    if(!success) {
        return res.status(400).json({error: "Error while updating information"});
    }
    const updatedUser = await User.findOneAndUpdate({_id: req.userId}, req.body);
    if(!updatedUser) {
        return res.status(404).json({error: "User not updated successfully"});
    }
    res.json({message: "User updated successfully"})
})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter;
    const Users = await User.find({$or: [{
        firstName: {
            "$regex": filter
        }
    }, {
        lastName: {
            "$regex": filter
        }
    }]});
    res.json({user: Users.map(user => ({
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_Name,
        _id: user._id
    }))});
})

module.exports = router;