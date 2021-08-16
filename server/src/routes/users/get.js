import express from 'express';

import auth from '@app/middleware';

const router = express.Router();

import User from '@app/models/user';

// Get all users
// Public endpoint

router.get('/', async (req, res) => {
    
    try {
        const users = User.find();

        res.json(users);
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


// Get Current User
// Private Endpoint

router.get('/me', auth, async (req, res) => {

    try {

        const _id = req.user.id;
        
        const user = await User.findOne ({
            _id
        });

        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).json()
    }

});

// Get Specific User
// Private Endpoint

router.get('/:id', auth, async (req, res) => {

    try {

        const _id = req.params.id;

        const user = await User.findOne({
            _id
        });

        if(!user) {
            res.status(400).json({
                errors: [
                    {
                        'message': 'User not found'
                    }
                ]
            })
        }

        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            errors: [
                {
                    'message': 'Internal Server Error',
                }
            ]
        })
    }

});

export default router;