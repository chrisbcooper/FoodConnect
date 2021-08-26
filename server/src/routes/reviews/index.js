import express from 'express';

const router = express.Router();

import reviewGet from './get.js';
import reviewPost from './post.js';

router.use('', reviewGet);
router.use('', reviewPost);

export default router;
