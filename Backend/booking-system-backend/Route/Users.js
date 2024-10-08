


// Route/Auth.js
import jwt from 'jsonwebtoken';
import { Login, ProfileDelete, ProfileGet, ProfileUpdate, Signup } from '../Controller/Users.controller.js';

import express from 'express'
const router = express.Router()
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Invalid token.' });
        }
        req.user = decoded; 
        next();
    });
};

router.post('/signup', Signup);

router.post('/login', Login);
// Middleware to authenticate the token
router.get('/profile/get', authenticate, ProfileGet);

router.put('/profile/update', authenticate, ProfileUpdate);
router.delete('/profile/delete', authenticate, ProfileDelete);

export default router;
