import express from 'express';

import auth from '@app/middleware';

import User from '@app/models/user';

import { upload } from '@app/middleware/upload';

const router = express.Router();

// Create User
// Private Endpoint

router.patch('/', [
    auth,
    upload.single('image')
] , async (req, res) => {

    const body = Object.assign({},req.body);

    try {

        const _id = req.user.id;
    
        const {
            bio,
            image,
            name,
        } = body;
    
        const newFields = {};

        if(bio) newFields.bio = bio;
        if(image) newFields.image = image;
        if(name) newFields.name = name;
        if(req.file) newFields.image = req.file.location;

        const user = await User.findOne({ _id });

        if(user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id },
                { $set: newFields },
                { new: true }
            );
            await updatedUser.save();
            return res.json(updatedUser);
        } 

        res.status(400).json ({
            'message': 'User does not exist'
        })

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