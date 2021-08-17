import express from 'express';

import Review from '@app/models/review';

const router = express.Router();

// Get all reviews for Restaurant
// Public

router.get('/restaurant/:id', async (req, res) => {
    
    const { id } = req.params;

    try {
        const user = await User.findOne({ _id: userID });

        if(!user) {
            return res.status(400).json({
                error: {
                    message: 'User does not exist'
                }
            })
        }

        res.json(user.reviews);
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
});
export default router;
