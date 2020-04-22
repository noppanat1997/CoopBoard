import db from '../configs/database';
import { documentTransform } from '../tools/transformer';

const testService = {};

testService.listAllUser = async () => {
  const user_result = await db.collection('user').get();
  return documentTransform(user_result);
};

export default testService;
