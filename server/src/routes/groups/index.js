import express from 'express';
const router = express.Router();

import getGroup from './get';
import postGroup from './post';

router.use('', getGroup);
router.use('', postGroup);

export default router;