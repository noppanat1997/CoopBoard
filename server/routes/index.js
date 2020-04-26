import express, { Router } from 'express';
import path from 'path';
// import passport from 'passport';

import test from './test';
import controllers from '../controllers';

const router = Router();

router.use('/api/test', test)
//NOTE
router.post('/api/add-board', controllers.addBoard)
router.delete('/api/delete-board/:boardId', controllers.deleteBoard)
// router.use(
//   '/static',
//   // passport.authenticate('jwt', { session: false }),
//   express.static(path.resolve(__dirname, '..', 'public'), {
//     fallthrough: false
//   })
// );

router.use(express.static(path.resolve(__dirname, '..', 'dist')));

router.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'))
);

router.use('*', (req, res) =>
  res.status(404).send({ message: 'no api handling' })
);

export default router;
