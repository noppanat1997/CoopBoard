import services from "../services";

import fire from '../configs/auth';

const controllers = {};
//NOTE
controllers.addBoard = async (req, res, next) => {
  try {
    const data = await services.addBoardData();

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

controllers.fetchBoard = async (req, res, next) => {
  try {
    const data = await services.fetchBoard();

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

controllers.deleteBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    await services.deleteBoard(boardId);

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

controllers.addPage = async (req, res, next) => {
  try {
    const { boardId } = req.body;
    const data = await services.addPage(boardId);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

controllers.deletePage = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const pageId = req.params.pageId;
    await services.deletePage(boardId, pageId);

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

controllers.clearPage = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const pageId = req.params.pageId;
    await services.clearPage(boardId, pageId);

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

controllers.changeBoardName = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const { boardName } = req.body;
    await services.changeBoardName(boardId, boardName);

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};
controllers.changeBoardImg = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const { img } = req.body;
    await services.changeBoardName(boardId, img);

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};
controllers.addUser = async (req, res, next) => {
  try {
    const { username, password, firstname, lastname, email } = req.body || {};

    const user = await fire.auth().createUserWithEmailAndPassword(username, password);
    await services.addUser(firstname, lastname, email);


    res.status(200).send(user);

  } catch (error) {
    console.log(error);
    next(error);
  }
}

controllers.userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body || {};

    const user = await fire.auth().signInWithEmailAndPassword(username, password);

    res.status(200).send(user);

  } catch (error) {
    console.log(error);
  }
}

export default controllers;
