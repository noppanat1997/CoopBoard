import testSevice from '../services/test';

const testController = {};

testController.testAPI = async (req, res, next) => {
  try {
    console.log(req.body);
    const user_result = await testSevice.name('');


    res.status(200).send({ message: 'end of controller' });
  } catch (error) {
    throw error;
  }
};

export default testController;
