import express from 'express';

const router = express.Router();

import restaurantGet from './get.js';
import restaurantPost from './post.js';

router.use('', restaurantGet);
router.use('', restaurantPost);

export default router;
