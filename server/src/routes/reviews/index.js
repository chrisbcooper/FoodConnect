import express from 'express';

const router = express.Router();

import reviewGet from './get';
import reviewPost from './post';

router.use('', reviewGet);
router.use('', reviewPost);

export default router;