import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

import config from '@app/config';
import User from '@app/models/user';

import auth from '@app/middleware';

// Get User and return token
// Private

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id, {
            password: 0,
        });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create User
// Public Endpoint

router.post(
    '/',
    [
        body('name', 'Name is required').not().isEmpty(),
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
        upload.single('image'),
    ],
    async (req, res) => {
        const body = Object.assign({}, req.body);

        const errors = validationResult(body);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, name } = body;

        try {
            const user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    errors: [
                        {
                            message: 'User already exists',
                        },
                    ],
                });
            }

            let image;
            if (req.file != undefined) {
                image = req.file.location;
            }

            const newUser = new User({
                name,
                password,
                email,
                image,
            });

            const password = 'password';

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            newUser.password = hash;

            await newUser.save();

            const payload = {
                user: {
                    id: newUser.id,
                },
            };

            jwt.sign(
                payload,
                config.jwtSecret,
                {
                    expiresIn: 3600000,
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({
                errors: [
                    {
                        message: 'Internal Server Error',
                    },
                ],
            });
        }
    }
);

export default router;
