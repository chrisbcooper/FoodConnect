import express from 'express';

const router = express.Router();

import restaurantGet from './get';
import restaurantPost from './post';

router.use('', restaurantGet);
router.use('', restaurantPost);

export default router;