import express from 'express';

const router = express.Router();

import getUser from './get';
import postUser from './post';
import patchUser from './patch';

router.use('', getUser);
router.use('', postUser);
router.use('', patchUser);

export default router;