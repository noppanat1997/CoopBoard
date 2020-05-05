import axios from 'axios';
import history from '../history';

const headers = {
  "Content-Type": "application/json",
};

axios.defaults.headers.common["Content-Type"] = "application/json";


export const addBoard = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:8080/api/add-board`, {user});
    // //console.log(res.data)
    if (!res.data) {
      const err = new Error("no `data` property on response object");
      throw err;
    }
    return dispatch({
      type: "ADD_BOARD",
      payload: res.data,
    });
  } catch (err) {
    //console.log(err);
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
    //console.log(err);
  }
};

export const fetchBoard = (userUid) => async (dispatch) => {
  try {
    // console.log(userUid)
    const res = await axios.post(`http://localhost:8080/api/fetch-board/`,{userUid});
    if (!res.data) {
      const err = new Error("no `data` property on response object");
      throw err;
    }
    return dispatch({
      type: "FETCH_BOARD",
      payload: res.data,
    });
  } catch (err) {
    //console.log(err);
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
    //console.log(err);
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
    //console.log(err);
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
    //console.log(err);
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
    //console.log(err);
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
    //console.log(err);
  }
};


export const addUser = (id, username, password, firstname, lastname, email) => async dispatch => {
  try {
    await axios.post(`http://localhost:8080/api/add-user`, {id,  username, password, firstname, lastname, email })

    history.push('/login')
  } catch (error) {
    //console.log(error);
  }
}

export const userLogin = (username, password) => async dispatch => {
  try {
    const res = await axios.post(`http://localhost:8080/api/user-login`, { username, password })
    // //console.log(res.data)
    const user = res?.data || null;
    return dispatch({
      type: 'USER_LOGIN',
      payload: user
    })
  } catch (error) {
    //console.log(error)

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
    //console.log(error)
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
    //console.log(error)
    
  }
}

export const inviteMember = (email,boardId) => async dispatch => {
  try {
    // //console.log(boardId)
    const res = await axios.post(`http://localhost:8080/api/invite-member`,{email,boardId})
    return dispatch({
      type: 'INVITE_MEMBER',
      payload: res.data
    })
  } catch (error) {
    //console.log(error)
    
  }
}

export const kickMember = (memberId,boardId) => async dispatch => {
  try {
    // //console.log('action????????',memberId,boardId)
    await axios.delete(`http://localhost:8080/api/kick-member/${boardId}/${memberId}`)
  } catch (error) {
    //console.log(error)
  }
}

export const addCard = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:8080/api/add-card`, data);
    if (!res.data) {
      const err = new Error("no `data` property on response object");
      throw err;
    }
    return dispatch({
      type: "ADD_CARD",
      payload: res.data,
    });
  } catch (err) {
    //console.log(err);
  }
};

export const updatePosition = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "UPDATE_POSITION",
      payload: data,
    });
    await axios.post(`http://localhost:8080/api/update-position`, data);
    return
  } catch (err) {
    //console.log(err);
  }
};

export const deleteCard = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_CARD",
      payload: data,
    });
    await axios.post(`http://localhost:8080/api/delete-card`, data);
    return
  } catch (err) {
    //console.log(err);
  }
};

export const addLine = (data) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:8080/api/add-line`, data);
    return dispatch({
      type: "ADD_LINE",
      payload: data,
    });
  } catch (err) {
    //console.log(err);
  }
};

export const deleteLine = (data) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:8080/api/delete-line`, data);
    return dispatch({
      type: "DELETE_LINE",
      payload: data,
    });
  } catch (err) {
    //console.log(err);
  }
};