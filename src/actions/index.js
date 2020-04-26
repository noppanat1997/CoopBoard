import axios from 'axios';
import history from '../history';

const headers = {
  'Content-Type': 'application/json'
};

axios.defaults.headers.common['Content-Type'] = 'application/json';

export const testAction = message => async dispatch => {
  console.log('here')
  const res = await axios.get(`http://localhost:8080/api/test/user`);
  console.log(res);
  console.log(message);

  return dispatch({
    type: 'CHANGE_PAGE',
    payload: 1
  });
}

export const addBoard = () => async dispatch => {
  try {
    const res = await axios.post(`http://localhost:8080/api/add-board`);
    console.log(res.data)
    if (!res.data) {
      const err = new Error('no `data` property on response object');
      throw err;
    }
    return dispatch({
      type: 'ADD_BOARD',
      payload: res.data
    });
  } catch (err) {
    console.log(err)
  }
}

//FIXME
export const deleteBoard = (boardId) => async dispatch => {
  try {
    await axios.delete(`http://localhost:8080/api/delete-board/${boardId}`);

    return dispatch({
      type: 'DELETE_BOARD',
      payload: { board: boardId }
    });
  } catch (err) {
    console.log(err)
  }
}


export const addUser = (username, password, firstname, lastname, email) => async dispatch => {
  try {
    await axios.post(`http://localhost:8080/api/add-user`, { username, password, firstname, lastname, email })

    history.push('/login')
    // return dispatch({
    //   type: 'ADD_USER',
    //   payload: user
    // })
  } catch (error) {
    console.log(error);
  }
}

export const userLogin = (username, password) => async dispatch => {
  try {

    console.log(username, password);
    const response = await axios.post(`http://localhost:8080/api/user-login`, { username, password })
    const user = response?.data?.user || {};
    return dispatch({
      type: 'USER_LOGIN',
      payload: user
    })
  } catch (error) {
    console.log(error)
  }
}