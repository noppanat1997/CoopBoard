import services from "../services";

import fire from "../configs/auth";

const controllers = {};
//NOTE
controllers.addBoard = async (req, res, next) => {
  try {
    const { user } = req.body;
    const data = await services.addBoardData(user);

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

    await fire
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then((result) => {
        // id = result.user.uid
        return result.user.updateProfile({
          displayName: firstname + " " + lastname,
        });
      });
    const user = await fire.auth().currentUser;
    const id = user.uid;
    await services.addUser(id, firstname, lastname, email);

    res.status(200).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

controllers.userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    await fire.auth().signInWithEmailAndPassword(username, password);

    let userData = null;
    await fire.auth().onAuthStateChanged((user) => {
      if (user) {
        userData = user;
      } else {
        userData = null;
      }
    });

    const uid = userData.uid
    const userFireStore = await services.getUser(uid)

    res.status(200).send(userFireStore);
  } catch (error) {
    console.log(error);
  }
};

controllers.checkLogin = async (req, res, next) => {
  try {
    let userData = null;
    await fire.auth().onAuthStateChanged((user) => {
      if (user) {
        userData = user;
      } else {
        userData = null;
      }
    });

    const uid = userData.uid
    const userFireStore = await services.getUser(uid)

    res.status(200).send(userFireStore);
  } catch (error) {
    console.log(error);
  }
};


controllers.userLogout = async (req, res, next) => {
  try {
    await fire.auth().signOut();
    res.status(200).send(null);
  } catch (error) {
    console.log(error);
  }
};

controllers.inviteMember = async (req, res, next) => {
  try {
    const { email,boardId } = req.body;
    const data = await services.inviteMember(email,boardId);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

export default controllers;
