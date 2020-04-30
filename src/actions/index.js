import axios from 'axios';
import history from '../history';

const headers = {
  "Content-Type": "application/json",
};

axios.defaults.headers.common["Content-Type"] = "application/json";


export const addBoard = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:8080/api/add-board`, {user});
    // console.log(res.data)
    if (!res.data) {
      const err = new Error("no `data` property on response object");
      throw err;
    }
    return dispatch({
      type: "ADD_BOARD",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteBoard = (boardId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/api/delete-board/${boardId}`);

    return dispatch({
      type: 'DELETE_BOARD',
      payload: { board: boardId }
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchBoard = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/fetch-board`);
    if (!res.data) {
      const err = new Error("no `data` property on response object");
      throw err;
    }
    return dispatch({
      type: "FETCH_BOARD",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addPage = (boardId) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:8080/api/add-page`, {
      boardId,
    });
    if (!res.data) {
      const err = new Error("no `data` property on response object");
      throw err;
    }
    return dispatch({
      type: "ADD_PAGE",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletePage = (data) => async (dispatch) => {
  try {
    const boardId = data.boardId;
    const pageId = data.pageId;
    await axios.delete(
      `http://localhost:8080/api/delete-page/${boardId}/${pageId}`
    );

    return dispatch({
      type: "DELETE_PAGE",
      payload: { board: data.boardId, page: data.page },
    });
  } catch (err) {
    console.log(err);
  }
};

export const clearFrame = (data) => async (dispatch) => {
  try {
    const boardId = data.boardId;
    const pageId = data.pageId;
    const page = data.page;
    await axios.post(
      `http://localhost:8080/api/clear-page/${boardId}/${pageId}`
    );

    return dispatch({
      type: "CLEAR_FRAME",
      payload: { board: boardId, page: page },
    });
  } catch (err) {
    console.log(err);
  }
};

export const changeBoardName = (data) => async (dispatch) => {
  try {
    const boardId = data.boardId;
    const boardName = data.boardName;
    await axios.post(
      `http://localhost:8080/api/change-board-name/${boardId}`,
      {boardName}
    );

    return dispatch({
      type: "CHANGE_BOARD_NAME",
      payload: { board: boardId, name: boardName },
    });
  } catch (err) {
    console.log(err);
  }
};

export const changeBoardImg = (data) => async (dispatch) => {
  try {
    const boardId = data.boardId;
    const img = data.img;
    await axios.post(
      `http://localhost:8080/api/change-board-img/${boardId}`,
      {img}
    );

    return dispatch({
      type: "CHANGE_BOARD_IMG",
      payload: { board: boardId, img: img },
    });
  } catch (err) {
    console.log(err);
  }
};


export const addUser = (username, password, firstname, lastname, email) => async dispatch => {
  try {
    await axios.post(`http://localhost:8080/api/add-user`, { username, password, firstname, lastname, email })

    history.push('/login')
  } catch (error) {
    console.log(error);
  }
}

export const userLogin = (username, password) => async dispatch => {
  try {
    const res = await axios.post(`http://localhost:8080/api/user-login`, { username, password })
    console.log(res.data)
    const user = res?.data || null;
    return dispatch({
      type: 'USER_LOGIN',
      payload: user
    })
  } catch (error) {
    console.log(error)

  }
}

export const checkLogin = () => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/api/check-login`)
    const user = res?.data || null;
    return dispatch({
      type: 'USER_LOGIN',
      payload: user
    })
  } catch (error) {
    console.log(error)
  }
}

export const userLogout = () => async dispatch => {
  try {
    const res = await axios.post(`http://localhost:8080/api/user-logout`)
    return dispatch({
      type: 'USER_LOGIN',
      payload: res.data
    })
  } catch (error) {
    console.log(error)
    
  }
}

export const inviteMember = (email,boardId) => async dispatch => {
  try {
    // console.log(boardId)
    const res = await axios.post(`http://localhost:8080/api/invite-member`,{email,boardId})
    return dispatch({
      type: 'INVITE_MEMBER',
      payload: res.data
    })
  } catch (error) {
    console.log(error)
    
  }
}
