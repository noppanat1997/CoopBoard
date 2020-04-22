import { Router } from 'express';

import testController from '../controllers/test';

const router = Router();

router.get('/user', testController.listAllUser);

export default router;
