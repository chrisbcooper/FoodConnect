const express = require('express');
const router = express.Router();

import users from './users';
import posts from './posts';
import groups from './groups';
import auth from './auth';
import yelp from './yelp';
import review from './reviews';
import restaurant from './restaurants';

router.use('/users', users);
router.use('/posts', posts);
router.use('/groups', groups);
router.use('/auth', auth);
router.use('/yelp', yelp);
router.use('/reviews', review);
router.use('/restaurants', restaurant);

export default router;