import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

import auth from '@app/middleware';
import Group from '@app/models/group';
import User from '@app/models/user';

// Create a group
// Private

router.post('/', [
    auth,
    body('name', 'Name is required').not().isEmpty(),
    body('bio', 'Bio is required').not().isEmpty(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { name, bio, image } = req.body;
    
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
        };
        
        const newGroup = new Group({
            name,
            bio,
            image,
            owner: userId,
            users: [
                {
                    user: userId
                }
            ]
        });

        await newGroup.save();

        user.groups.unshift({ group: newGroup._id });
        await user.save()

        return res.json(newGroup);

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

// Follow a group
// Private

router.post('/:id/follow', auth , async (req, res) => {

    const userID = req.user.id;
    const { id } = req.params;
    
    try {

        const user = await User.findOne({ _id: userID });

        if(!user) {
            return res.status(400).json({
                errors: [
                    {
                    message: 'User does not exist'
                    }
                ]
            })
        };

        const group = await Group.findOne({ _id: id });

        if(group.users.filter((user) => user.user.toString() === userID).length > 0) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Already follow group'
                    }
                    
                ]
            })
        }

        group.users.unshift({ user: userID });
        await group.save();

        user.groups.unshift({ group: group._id });
        await user.save();
        
        return res.json(group);

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

// Unfollow a group
// Private

router.post('/:id/unfollow', auth , async (req, res) => {

    const userID = req.user.id;
    const { id } = req.params;
    
    try {

        const user = await User.findOne({ _id: userID });

        if(!user) {
            return res.status(400).json({
                errors: [
                    {
                    message: 'User does not exist'
                    }
                ]
            })
        };

        const group = await Group.findOne({ _id: id });

        if(group.users.filter((user) => user.user.toString() === userID).length === 0) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Group not found'
                    }
                    
                ]
            })
        }

        if(group.owner.toString() === userID) {
            return res.status(400).json({
                errors: [
                    {
                        'message': 'Cannot unfollow if owner'
                    }
                    
                ]
            })
        }

        const removeUserIndex = group.users.map((user) => user.user.toString()).indexOf(userID);
        group.users.splice(removeUserIndex, 1);

        const removeGroupindex = user.groups.map((group) => group.group.toString()).indexOf(group._id);
        user.groups.splice(removeGroupindex, 1);

        
        await group.save();
        await user.save();
        
        return res.json(user);

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