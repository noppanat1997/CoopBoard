// import test from '../domains/test';

const testController = {};

testController.testAPI = async (req, res, next) => {
  try {
    // await callDB
    res.status(200).send({ message: 'end of controller' });
  } catch (error) {
    throw error;
  }
};

export default testController;
