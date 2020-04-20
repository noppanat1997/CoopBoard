import axios from 'axios';

const headers = {
  'Content-Type': 'application/json'
};

axios.defaults.headers.common['Content-Type'] = 'application/json';


// export const delStudent = id => {
//   return (dispatch) => {
//     axios.delete(`http://localhost:3001/api/students/${id}`)
//     .then((res) => {
//       dispatch({
//         type: 'DEL_STUDENT',
//         payload: res.data.id
//       });
//     });
//   }
// }

export const testAction = message => async dispatch => {
  console.log('here')
  const res = await axios.get(`http://localhost:8080/api/test/test-api`)
  console.log(message)
  console.log(res)
  return dispatch({
    type: 'CHANGE_PAGE',
    payload: 1
  });
}