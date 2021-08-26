import express from 'express';
const router = express.Router();

import users from './users/index.js';
import posts from './posts/index.js';
import groups from './groups/index.js';
import auth from './auth/index.js';
import yelp from './yelp/index.js';
import review from './reviews/index.js';
import restaurant from './restaurants/index.js';

router.use('/users', users);
router.use('/posts', posts);
router.use('/groups', groups);
router.use('/auth', auth);
router.use('/yelp', yelp);
router.use('/reviews', review);
router.use('/restaurants', restaurant);

export default router;
