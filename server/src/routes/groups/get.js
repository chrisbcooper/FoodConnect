import express from 'express';

const router = express.Router();

import auth from '@app/middleware';

import Group from '@app/models/group';
import User from '@app/models/user';

// Get all groups
// Public 

router.get('/', async (req, res) => {

    try {
        const groups = await Group.find();
        return res.json(groups);
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

// Get current user groups
// Private 

router.get('/', auth, async (req, res) => {

    const userId = req.user.id;

    try {
        const user = await User.findOne({ _id: userId });
        
        if(!user) {
            return res.status(400).json({
                errors: [
                    {
                    message: 'User does not exist'
                    }
                ]
            })
        }

        const groups = user.groups;
        console.log(groups);

        return res.send('hello');

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


// Get specific group
// Public

router.get('/', async (req, res) => {

    try {
        const groups = await Group.findMany();
        return res.json(groups);
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