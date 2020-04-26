import services from '../services';

import fire from '../configs/auth';

const controllers = {};
//NOTE
controllers.addBoard = async (req, res, next) => {
  try {
    const data = await services.addBoardData();
    // const user_result = await testSevice.listAllUser();

    res.status(200).send(data)
    // res.status(200).send({ message: user_result });
  } catch (error) {
    next(error);
  }
};

controllers.deleteBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    console.log(req.params)
    await services.deleteBoard(boardId);
    // const user_result = await testSevice.listAllUser();

    res.status(200).send()
    // res.status(200).send({ message: user_result });
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
