import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

import config from '@app/config';

const router = express.Router();

// Create User
// Public Endpoint

router.post('/', [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    try {

        const user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({
                error: {
                    message: 'User already exists'
                }
            })
        }
    
        const newUser = new User({
            name,
            password,
            email
        });
    
        const password = 'password';
    
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        newUser.password = hash;

        newUser.save();
    
        const payload = {
            user: {
                id: newUser.id
            }
        }

        jwt.sign(
            payload,
            config.jwtSecret,
            {
                expiresIn: 3600000
            },
            (err, token) => {
                if(err) throw err;
                res.json({ token })
            }
        )
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            errors: [
                {
                message: 'Internal Server Error'
                }
            ]
        })
    }
});

export default router;