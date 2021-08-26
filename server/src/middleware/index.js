import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const middleware = async function (req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authoriztion denied' });
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default middleware;
