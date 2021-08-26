import express from 'express';

const router = express.Router();

import User from '../../models/user.js';

import auth from '../../middleware/index.js';

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
        res.status(500).send('Server errors');
    }
});

export default router;
