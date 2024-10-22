import { v4 as uuidv4 } from "uuid";
const initialState = {
  isLoading: false,
  user: null,
  curPage: 1,
  penColor: "#9E005D",
  penSize: 10,
  //[{start: {offsetX: 325, offsetY: 180},stop: {offsetX: 340, offsetY: 180}}]
  lineData: [
    // {
    //   id: 1,
    //   data: [{ id: 1, line: [], color: [], size: [] }]
    // },
    // {
    //   id: 2,
    //   data: [{ id: 1, line: [], color: [], size: [] }]
    // }
  ],
  buttonData: {
    1: { isActive: 0 },
    2: { isActive: 0 },
    3: { isActive: 1 },
    4: { isActive: 0 },
    5: { isActive: 0 },
  },
  penColor: "#9E005D",
  penSize: 10,
  toolbarOpen: false,
  color: 1,
  size: 2,
  isHolding: false,
  isDrop: false,
  onDropArea: false,
  onCanvas: false,
  inviteStatus: "",
  userData: {
    Name: "Nontapat",
    Surname: "Sirichuensuwan",
    Color: 0,
  },
  memberCount: 1,
  formCardData: {
    1: { onFormSetting: 0, name: "Post-It" },
    2: { onFormSetting: 0, name: "Checklist" },
    3: { onFormSetting: 0, name: "Calendar" },
    4: { onFormSetting: 0, name: "Map" },
    5: { onFormSetting: 0, name: "Table" },
    6: { onFormSetting: 0, name: "Url" },
    7: { onFormSetting: 0, name: "Code" },
    8: { onFormSetting: 0, name: "Video" },
    9: { onFormSetting: 0, name: "Picture" },
  },
  msgData: {
    1: { id: 1, name: "server", msg: ["I am server", "I am 20 years old"] },
    2: { id: 2, name: "user1", msg: [] },
  },
  cardData: [
    // {
    //   id: 1,
    //   data: [
    //     { id: 1, data: [] },
    //     { id: 2, data: [{ id: 1, type: 'Post-It',size: 'l', color: 'yellow', position: { x: 0, y: 0 }, text: '2', isNew: false }] }]
    // },
    // {
    //   id: 2,
    //   data: [{id: 1, data: []}]
    // }
  ],
  //NOTE
  boardData: [
    // { id: 1, name: 'board A', img: '' },
    // { id: 2, name: 'board B', img: '' }
  ],
  recentBoardData: [],
};
const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    //REVIEW add page
    case "ADD_PAGE": {
      const { boardId, newLineDataToArray, newCardData } = action.payload;
      let newBoardData = [...state.boardData];
      let boardIndex;
      for (let i = 0; i < newBoardData.length; i++) {
        if (newBoardData[i].id === boardId) {
          boardIndex = i;
          break;
        }
      }
      newState.lineData[boardIndex].data.push(newLineDataToArray);
      newState.cardData[boardIndex].data.push(newCardData);

      return newState;
    }
    case "CHANGE_PAGE":
      const newPage = action.payload;
      newState.curPage = newPage;
      return newState;
    //REVIEW add line
    case "ADD_LINE":
      const {
        boardId,
        pageId,
        data: updatedLineData,
        color,
        size,
      } = action.payload;
      let newBoardIndex;
      for (let i = 0; i < state.lineData.length; i++) {
        if (state.lineData[i].id === boardId) {
          newBoardIndex = i;
          break;
        }
      }
      const lineList = Object.values(updatedLineData)

      newState.lineData[newBoardIndex].data[state.curPage - 1].line.push(
        lineList
      )
      newState.lineData[newBoardIndex].data[state.curPage - 1].color.push(
        color
      );
      newState.lineData[newBoardIndex].data[state.curPage - 1].size.push(size);
      return newState;
    //REVIEW delete line
    case "DELETE_LINE":
      let {
        boardId: boardId_2,
        pageId: pageId_2,
        data: deletedLineData,
      } = action.payload;
      let newBoardIndex_2;
      for (let i = 0; i < state.lineData.length; i++) {
        if (state.lineData[i].id === boardId_2) {
          newBoardIndex_2 = i;
          break;
        }
      }
      for (var i = deletedLineData.length; i > 0; i--) {
        const t = deletedLineData.pop();
        newState.lineData[newBoardIndex_2].data[state.curPage - 1].line.splice(
          t,
          1
        );
        newState.lineData[newBoardIndex_2].data[state.curPage - 1].color.splice(
          t,
          1
        );
        newState.lineData[newBoardIndex_2].data[state.curPage - 1].size.splice(
          t,
          1
        );
      }
      return newState;

    case "TOGGLE_BUTTON":
      const { newId, newIsActive } = action.payload;
      //console.log(newId);
      if ((newId <= 5) & (newId > 0)) {
        const newbuttonData = {
          1: { isActive: 0 },
          2: { isActive: 0 },
          3: { isActive: 0 },
          4: { isActive: 0 },
          5: { isActive: 0 },
        };
        newbuttonData[newId].isActive = newIsActive;
        return {
          ...state,
          buttonData: newbuttonData
        };
      } else if (newId == 10) {
        newState.toolbarOpen = !newState.toolbarOpen;
        return newState;
      } else if ((newId > 10) & (newId < 15)) {
        newState.color = newId - 10;
        switch (newId) {
          case "11":
            newState.penColor = "#9E005D";
            break;
          case "12":
            newState.penColor = "#D4145A";
            break;
          case "13":
            newState.penColor = "#0071BC";
            break;
          case "14":
            newState.penColor = "#202C5D";
            break;
          default:
            // console.log("bruh");
            break;
        }
        newState.toolbarOpen = false;
        return newState;
      } else if ((newId > 20) & (newId < 25)) {
        newState.size = newId - 20;
        switch (newId) {
          case "21":
            newState.penSize = 2;
            break;
          case "22":
            newState.penSize = 5;
            break;
          case "23":
            newState.penSize = 10;
            break;
          case "24":
            newState.penSize = 15;
            break;
        }
        newState.toolbarOpen = false;
        return newState;
      }

    case "UPDATE_ON_DROP_AREA":
      const { isHolding, isDrop } = action.payload;
      // console.log(action.payload);
      return {
        ...state,
        isHolding: isHolding,
        isDrop: isDrop,
      };
    case "UPDATE_ON_FORM_SETTING": {
      const cardId = action.payload;
      let newOnFormSetting = state.formCardData;
      Object.keys(newOnFormSetting).map(
        (key) => (newOnFormSetting[key].onFormSetting = 0)
      );
      newOnFormSetting[cardId].onFormSetting = 1;
      return {
        ...state,
        formCardData: newOnFormSetting,
      };
    }
    case "ADD_MSG": {
      let { userID, userMsg } = action.payload;
      return {
        ...state,
        msgData: {
          ...state.msgData,
          userID: {
            ...state.msgData[userID],
            msg: state.msgData[userID].msg.push(userMsg),
          },
        },
      };
    }
    // REVIEW add card
    case "ADD_CARD": {
      const { boardId, pageId, data } = action.payload;
      let newData = [...state.cardData];
      let boardIndex;
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].id === boardId) {
          boardIndex = i;
          break;
        }
      }
      let newList = newData[boardIndex].data[state.curPage - 1].data;

      newList = [...newList, data];

      newData[boardIndex].data[state.curPage - 1] = {
        ...newData[boardIndex].data[state.curPage - 1],
        data: newList,
      };

      return {
        ...state,
        cardData: newData,
      };
    }
    // REVIEW update position
    case "UPDATE_POSITION": {
      let { board, curPage, id, position } = action.payload;
      let newData = [...state.cardData];
      let boardIndex;
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].id === board) {
          boardIndex = i;
          break;
        }
      }
      let newList = newData[boardIndex].data[state.curPage - 1].data;
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].id === id) {
          newList[i].position = { ...position };
          newList[i].isNew = false;
        }
      }

      newData[boardIndex].data[state.curPage - 1] = {
        ...newData[boardIndex].data[state.curPage - 1],
        data: newList,
      };

      return {
        ...state,
        cardData: newData,
      };
    }
    case "CHECK_PANEL": {
      const check = action.payload;
      if (check == 1) {
        newState.toolbarOpen = false;
      }
      return newState;
    }
    // REVIEW addboard
    case "ADD_BOARD": {
      let {
        boardData: newBoardData,
        lineData: newLineData,
        cardData: newCardData,
        boardId: boardId,
      } = action.payload;
      const newUser = state.user;
      if (newUser) {
        newUser.board = [...newUser.board, boardId];
      }
      return {
        ...state,
        lineData: [...state.lineData, newLineData],
        cardData: [...state.cardData, newCardData],
        boardData: [...state.boardData, newBoardData],
        user: newUser,
      };
    }
    // REVIEW b img
    case "CHANGE_BOARD_IMG": {
      let { board, img } = action.payload;
      let newBoardData = [...state.boardData];
      let boardIndex;
      for (let i = 0; i < newBoardData.length; i++) {
        if (newBoardData[i].id === board) {
          boardIndex = i;
        }
      }
      newBoardData[boardIndex].img = img;
      return {
        ...state,
        boardData: newBoardData,
      };
    }
    // REVIEW recent
    case "ADD_RECENT_BOARD": {
      let { board } = action.payload;
      let newRecentBoardData = [...state.recentBoardData];
      let boardIndex;
      for (let i = 0; i < state.boardData.length; i++) {
        if (state.boardData[i].id === board) {
          boardIndex = i;
          break;
        }
      }
      for (let i = 0; i < newRecentBoardData.length; i++) {
        if (newRecentBoardData[i].id === board) {
          newRecentBoardData.splice(i, 1);
        }
      }
      newRecentBoardData = [state.boardData[boardIndex], ...newRecentBoardData];
      if (newRecentBoardData.length > 4) {
        newRecentBoardData.pop();
      }
      return {
        ...state,
        recentBoardData: newRecentBoardData,
      };
    }
    // REVIEW delete card
    case "DELETE_CARD": {
      let { board, curPage, id } = action.payload;
      let newData = [...state.cardData];
      let boardIndex;
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].id === board) {
          boardIndex = i;
        }
      }
      let newList = newData[boardIndex].data[state.curPage - 1].data;

      for (let i = 0; i < newList.length; i++) {
        if (newList[i].id == id) {
          newList.splice(i, 1);
        }
      }
      newData[boardIndex].data[state.curPage - 1].data = newList;
      return {
        ...state,
        cardData: newData,
      };
    }
    case "ON_CANVAS": {
      let onCanvas = action.payload;
      let onDropArea = state.isDrop && onCanvas;
      return {
        ...state,
        onCanvas: onCanvas,
        isDrop: false,
        onDropArea: onDropArea,
      };
    }
    // REVIEW delete page
    case "DELETE_PAGE": {
      let { board, page } = action.payload;
      let newLineData = [...state.lineData];
      let newCardData = [...state.cardData];
      let boardIndex;
      for (let i = 0; i < newCardData.length; i++) {
        if (newCardData[i].id === board) {
          boardIndex = i;
          break;
        }
      }
      newLineData[boardIndex].data.splice(page - 1, 1);
      newCardData[boardIndex].data.splice(page - 1, 1);
      return {
        ...state,
        lineData: newLineData,
        cardData: newCardData,
      };
    }
    //REVIEW clear frame
    case "CLEAR_FRAME": {
      let { board, page } = action.payload;
      let newLineData = [...state.lineData];
      let newCardData = [...state.cardData];
      let boardIndex;
      for (let i = 0; i < newCardData.length; i++) {
        if (newCardData[i].id === board) {
          boardIndex = i;
          break;
        }
      }
      newLineData[boardIndex].data[page - 1].line = [];
      newLineData[boardIndex].data[page - 1].color = [];
      newLineData[boardIndex].data[page - 1].size = [];

      newCardData[boardIndex].data[page - 1].data = [];
      return {
        ...state,
        lineData: newLineData,
        cardData: newCardData,
      };
    }
    // REVIEW b name
    case "CHANGE_BOARD_NAME": {
      let { board, name } = action.payload;
      let newBoardData = [...state.boardData];
      let newRecentBoardData = [...state.recentBoardData];
      for (let i = 0; i < state.boardData.length; i++) {
        if (newBoardData[i].id === board) {
          newBoardData[i].name = name;
          break;
        }
      }
      for (let i = 0; i < state.recentBoardData.length; i++) {
        if (newRecentBoardData[i].id === board) {
          newRecentBoardData[i].name = name;
          break;
        }
      }
      return {
        ...state,
        boardData: newBoardData,
        recentBoardData: newRecentBoardData,
      };
    }
    // REVIEW del board
    case "DELETE_BOARD": {
      // console.log("try to delete board");
      let { board } = action.payload;
      let newBoardData = [...state.boardData];
      let newRecentBoardData = [...state.recentBoardData];
      let newLineData = [...state.lineData];
      let newCardData = [...state.cardData];

      for (let i = 0; i < state.boardData.length; i++) {
        if (state.boardData[i].id === board) {
          newBoardData.splice(i, 1);
          break;
        }
      }
      for (let i = 0; i < state.recentBoardData.length; i++) {
        if (state.recentBoardData[i].id === board) {
          newRecentBoardData.splice(i, 1);
          break;
        }
      }
      for (let i = 0; i < state.lineData.length; i++) {
        if (state.lineData[i].id === board) {
          newLineData.splice(i, 1);
          break;
        }
      }
      for (let i = 0; i < state.cardData.length; i++) {
        if (state.cardData[i].id === board) {
          newCardData.splice(i, 1);
          break;
        }
      }

      return {
        ...state,
        lineData: newLineData,
        cardData: newCardData,
        boardData: newBoardData,
        recentBoardData: newRecentBoardData,
      };
    }

    case "UPDATE_LOADER": {
      let newIsLoading = action.payload;
      return {
        ...state,
        isLoading: newIsLoading,
      };
    }
    //REVIEW fetch board
    case "FETCH_BOARD": {
      let {
        newBoardDataList: newBoardDataList,
        newLineDataList: newLineDataList,
        newCardDataList: newCardDataList,
      } = action.payload;

      return {
        ...state,
        lineData: newLineDataList,
        cardData: newCardDataList,
        boardData: newBoardDataList,
        isLoading: false,
      };
    }
    case "USER_LOGIN": {
      const currentUser = action.payload;
      return {
        ...state,
        user: currentUser,
        isLoading: false,
      };
    }
    case "INVITE_MEMBER": {
      const { status } = action.payload;
      return {
        ...state,
        inviteStatus: status,
      };
    }

    case "CARD_DATA_SNAPSHOT":{
      const { boardId , data } = action.payload; 
      let boardIndex
      for (let i = 0; i < state.cardData.length; i++) {
        if (state.cardData[i].id === boardId) {
          boardIndex = i;
          break;
        }
      }
      const newCardData = [...state.cardData];
      newCardData[boardIndex].data = data
      return {
        ...state,
        cardData: newCardData
      }
    }

    case "LINE_DATA_SNAPSHOT":{
      const { boardId , data } = action.payload; 
      let boardIndex
      for (let i = 0; i < state.lineData.length; i++) {
        if (state.lineData[i].id === boardId) {
          boardIndex = i;
          break;
        }
      }
      const newLineData = [...state.lineData];
      data.forEach(item=>item.line = Object.values(item.line))
      const newListData = data
      console.log(newListData)
      newLineData[boardIndex].data = newListData
      return {
        ...state,
        lineData: newLineData
      }
    }

    case "BOARD_DATA_SNAPSHOT":{
      const { boardId , data } = action.payload; 
      let boardIndex
      for (let i = 0; i < state.boardData.length; i++) {
        if (state.boardData[i].id === boardId) {
          boardIndex = i;
          break;
        }
      }
      const newBoardData = [...state.boardData];
      newBoardData[boardIndex].data = data
      return {
        ...state,
        boardData: newBoardData
      }
    }
    default:
      break;
  }
  return state;
};
export default reducer;
