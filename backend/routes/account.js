const { Account } = require('../db');
const authMiddleware = require('../middleware');

const express = require('express');
const router = express.Router();

router.get('/balance',authMiddleware, async (req, res) => {
    const user = await Account.findOne({userId: req.userId});
    if (!user) {
        return res.status(404).json({error: "User not found"});
    }
    res.status(200).json({balance: user.balance});
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const {to, amount} = req.body;
    const from = req.userId;
    const fromUser = await Account.findOne({userId: from});
    if(amount > fromUser.balance) {
        return res.status(400).json({error: "Insufficient balance"});
    }
    const red = await Account.findOneAndUpdate({userId: from}, { $inc: { balance: -amount } });

    const success = await Account.findOneAndUpdate({userId: to}, { $inc: { balance: amount } });
    if (!success) {
        await Account.findByIdAndUpdate(from, { $inc: { balance: amount } });
        return res.status(404).json({error: "Invalid account"});
    }
    res.status(200).json({message: "Transfer successful"});
})

module.exports = router;