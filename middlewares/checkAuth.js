const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const checkAuth = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const authToken = authHeader && authHeader.split(' ')[1];
    if(!authToken) throw new Error();
    try {
    const payLoad = jwt.verify(
        authToken,
        process.env.TOKEN_SECRET
    )
    req.currentUser = payLoad.username;
    next();
    }
    catch(err) {
        throw new Error('Unauthorized');
    }
}

module.exports = {
    checkAuth
}