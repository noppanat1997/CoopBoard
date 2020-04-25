import db from '../configs/database';
import dtf  from '../tools/transformer';

const testService = {};

testService.listAllUser = async () => {
  const user_result = await db.collection('user').get();
  return dtf.basicTransform(user_result);
};

export default testService;
