import express, { Router } from 'express';
import path from 'path';
// import passport from 'passport';

import test from './test';

const router = Router();

router.use('/api/test', test);

// router.use(
//   '/static',
//   // passport.authenticate('jwt', { session: false }),
//   express.static(path.resolve(__dirname, '..', 'public'), {
//     fallthrough: false
//   })
// );

router.use(express.static(path.resolve(__dirname, '..', 'dist')));

router.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'app.html'))
);

router.use('*', (req, res) =>
  res.status(404).send({ message: 'no api handling' })
);

export default router;
