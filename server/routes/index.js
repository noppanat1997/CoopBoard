import express, { Router } from 'express';
import path from 'path';

import controllers from '../controllers';

const router = Router();

router.post('/api/add-board', controllers.addBoard)
router.post('/api/change-board-name/:boardId', controllers.changeBoardName)
router.post('/api/change-board-img/:boardId', controllers.changeBoardImg)
router.post('/api/fetch-board', controllers.fetchBoard)

router.post('/api/add-page', controllers.addPage)
router.post('/api/clear-page/:boardId/:pageId', controllers.clearPage)

router.post('/api/add-card', controllers.addCard)
router.post('/api/update-position', controllers.updatePositon)
router.post('/api/delete-card', controllers.deleteCard)

router.post('/api/add-line', controllers.addLine)

router.post('/api/add-user', controllers.addUser)
router.post('/api/invite-member', controllers.inviteMember)
router.post('/api/user-login', controllers.userLogin)
router.post('/api/user-logout', controllers.userLogout)

router.get('/api/check-login', controllers.checkLogin)

router.delete('/api/delete-board/:boardId', controllers.deleteBoard)
router.delete('/api/delete-page/:boardId/:pageId', controllers.deletePage)
router.delete('/api/kick-member/:boardId/:memberId', controllers.kickMember)

router.use(express.static(path.resolve(__dirname, '..', 'dist')));

router.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'))
);

router.use('*', (req, res) =>
  res.status(404).send({ message: 'no api handling' })
);

export default router;
