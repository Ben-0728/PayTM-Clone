const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./config.js');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({error: "No token provided"});
    }
    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({error: "Unauthorized"});
    }
}

module.exports = authMiddleware;