import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

import config from '@app/config';

import User from '@app/models/user';
import auth from '@app/middleware';

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

// Follow another user
// Private

router.post('/:id/follow', auth, async (req, res) => {

    const { id } = req.params;
    const userID = req.user.id;

    try {

        const currUser = await User.findOne({ _id: userID });
        const followUser = await User.findOne({ _id: id });

        if(!followUser || !currUser) {
            return res.status(400).json({
                error: {
                    message: 'One user does not exist'
                }
            })
        }

        if(currUser.following.filter((user) => user.following_id.toString() === id).length > 0) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Already following user'
                    }
                    
                ]
            })
        }

        currUser.following.unshift({ following_id: followUser._id });
        followUser.followers.unshift({ follower_id: currUser._id });

        await currUser.save();
        await followUser.save();

        res.json(currUser);
        
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


// Unfollow another user
// Private

router.post('/:id/unfollow', auth, async (req, res) => {

    const { id } = req.params;
    const userID = req.user.id;

    try {

        const currUser = await User.findOne({ _id: userID });
        const followUser = await User.findOne({ _id: id });

        if(!followUser || !currUser) {
            return res.status(400).json({
                error: {
                    message: 'One user does not exist'
                }
            })
        }

        if(currUser.following.filter((user) => user.following_id.toString() === id).length === 0) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Not following user'
                    }
                    
                ]
            })
        }

        const removeCurrIndex = currUser.following.map((user) => user.following_id.toString()).indexOf(id);
        const removeFollowIndex = followUser.followers.map((user) => user.follower_id.toString()).indexOf(userID);

        currUser.following.splice(removeCurrIndex, 1);
        followUser.followers.splice(removeFollowIndex, 1);

        await currUser.save();
        await followUser.save();

        res.json(currUser);
        
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