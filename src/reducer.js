const initialState = {
  curPage: 1,
  penColor: '#9E005D',
  penSize: 10,
  //[{start: {offsetX: 325, offsetY: 180},stop: {offsetX: 340, offsetY: 180}}]
  lineData: [
    {
      id: 1,
      data: [{ id: 1, line: [], color: [], size: [] },
      { id: 2, line: [], color: [], size: [] },
      { id: 3, line: [], color: [], size: [] },
      { id: 4, line: [], color: [], size: [] }]
    },
    {
      id: 2,
      data: [{ id: 1, line: [], color: [], size: [] },
      { id: 2, line: [], color: [], size: [] },
      { id: 3, line: [], color: [], size: [] },
      { id: 4, line: [], color: [], size: [] }]
    },
    {
      id: 3,
      data: [{ id: 1, line: [], color: [], size: [] },
      { id: 2, line: [], color: [], size: [] },
      { id: 3, line: [], color: [], size: [] },
      { id: 4, line: [], color: [], size: [] }]
    },
  ],
  buttonData: {
    1: { isActive: 0 },
    2: { isActive: 0 },
    3: { isActive: 1 },
    4: { isActive: 0 },
    5: { isActive: 0 }
  },
  penColor: '#9E005D',
  penSize: 10,
  toolbarOpen: false,
  color: 1,
  size: 2,
  isHolding: false,
  isDrop: false,
  onDropArea: false,
  onCanvas: false,
  isPresent: false,
  userData: {
    Name: "Nontapat",
    Surname: "Sirichuensuwan"
  },
  memberCount: 1,
  formCardData: {
    1: { onFormSetting: 0, name: 'Post-It' },
    2: { onFormSetting: 0, name: 'To-Do-Lists' },
    3: { onFormSetting: 0, name: 'Calendar' },
    4: { onFormSetting: 0, name: 'Map' },
    5: { onFormSetting: 0, name: 'Table' },
    6: { onFormSetting: 0, name: 'Url' },
    7: { onFormSetting: 0, name: 'Code' },
    8: { onFormSetting: 0, name: 'Video' }
  },
  msgData: {
    1: { id: 1, name: 'server', msg: ['I am server', 'I am 20 years old'] },
    2: { id: 2, name: 'user1', msg: [] }
  },
  cardData: [
    {
      id: 1,
      data: [
        { id: 1, data: [] },
        { id: 2, data: [{ id: 1, size: 'l', color: 'yellow', position: { x: 0, y: 0 }, text: '2', isNew: false }] },
        { id: 3, data: [{ id: 1, size: 'l', color: 'yellow', position: { x: 0, y: 0 }, text: '3', isNew: false }] },
        { id: 4, data: [{ id: 1, size: 'l', color: 'yellow', position: { x: 0, y: 0 }, text: '4', isNew: false }] }
      ]
    },
    {
      id: 2,
      data: [
        { id: 1, data: [{ id: 1, size: 'l', color: 'yellow', position: { x: 0, y: 0 }, text: 'Hello Post-It1', isNew: false }] },
        { id: 2, data: [{ id: 1, size: 'l', color: 'yellow', position: { x: 0, y: 0 }, text: 'Hello Post-It2', isNew: false }] },
        { id: 3, data: [] },
        { id: 4, data: [] }
      ]
    },
    {
      id: 3,
      data: [
        { id: 1, data: [] },
        { id: 2, data: [] },
        { id: 3, data: [] },
        { id: 4, data: [] }
      ]
    }
  ],
  boardData: [
    { id: 1, name: 'board A', img: '' },
    { id: 2, name: 'board B', img: '' },
    { id: 3, name: 'board C', img: '' }
  ],
  recentBoardData: [
    { id: 1, name: 'board A', img: '' }
  ]
}
const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'CHANGE_PAGE':
      const { boardId: bId, curPage } = action.payload
      let board = bId - 1;
      if (curPage > state.lineData[board].data.length) {
        newState.lineData[board].data.push({
          id: newState.lineData[board].data[newState.lineData[board].data.length - 1].id + 1,
          line: [],
          color: [],
          size: []
        });
      }
      if (curPage > state.cardData[board].data.length) {
        newState.cardData[board].data.push({
          id: newState.cardData[board].data[newState.cardData[board].data.length - 1].id + 1,
          data: []
        });
      }
      newState.curPage = curPage
      console.log(newState.lineData)
      return newState;

    case 'UPDATE_LINE':
      const { boardId, pageId, data: updatedLineData, mode } = action.payload;
      if (mode == 1) {
        newState.lineData[boardId - 1].data[pageId].line.push(updatedLineData);
        newState.lineData[boardId - 1].data[pageId].color.push(newState.penColor);
        newState.lineData[boardId - 1].data[pageId].size.push(newState.penSize);
      }
      else if (mode == 2) {
        for (var i = updatedLineData.length; i > 0; i--) {
          const t = updatedLineData.pop();
          newState.lineData[boardId - 1].data[pageId].line.splice(t, 1);
          newState.lineData[boardId - 1].data[pageId].color.splice(t, 1);
          newState.lineData[boardId - 1].data[pageId].size.splice(t, 1);
        }
      }
      return newState;

    case 'TOGGLE_BUTTON':
      const { newId, newIsActive } = action.payload;
      //console.log(newId);
      if (newId <= 5 & newId > 0) {
        const newbuttonData = {
          1: { isActive: 0 },
          2: { isActive: 0 },
          3: { isActive: 0 },
          4: { isActive: 0 },
          5: { isActive: 0 }
        }
        newbuttonData[newId].isActive = newIsActive
        return {
          ...state,
          buttonData: newbuttonData
        }
      }
      else if (newId == 10) {
        newState.toolbarOpen = !newState.toolbarOpen;
        return newState;
      }
      else if (newId > 10 & newId < 15) {
        newState.color = newId - 10
        switch (newId) {
          case '11': newState.penColor = '#9E005D'; break
          case '12': newState.penColor = '#D4145A'; break
          case '13': newState.penColor = '#0071BC'; break
          case '14': newState.penColor = '#202C5D'; break
          default: console.log("bruh"); break
        }
        return newState
      }
      else if (newId > 20 & newId < 25) {
        newState.size = newId - 20
        switch (newId) {
          case '21': newState.penSize = 5; break
          case '22': newState.penSize = 10; break
          case '23': newState.penSize = 15; break
          case '24': newState.penSize = 20; break
        }
        return newState
      }

    case 'CHANGE_PRESENT':
      const { present } = action.payload
      newState.isPresent = !newState.isPresent;
      return newState

    case 'INVITE_MEMBER':
      const { member } = action.payload
      if (newState.memberCount < 6) {
        newState.memberCount += 1;
        console.log(newState.memberCount)
      }
      return newState

    case 'UPDATE_ON_DROP_AREA':
      const { isHolding, isDrop } = action.payload
      console.log(action.payload)
      return {
        ...state,
        isHolding: isHolding,
        isDrop: isDrop
      }
    case 'UPDATE_ON_FORM_SETTING': {
      const cardId = action.payload
      let newOnFormSetting = state.formCardData
      Object.keys(newOnFormSetting).map((key) => newOnFormSetting[key].onFormSetting = 0)
      newOnFormSetting[cardId].onFormSetting = 1
      return {
        ...state,
        formCardData: newOnFormSetting
      }
    }
    case 'ADD_MSG': {
      let { userID, userMsg } = action.payload
      return {
        ...state,
        msgData: { ...state.msgData, userID: { ...state.msgData[userID], msg: state.msgData[userID].msg.push(userMsg) } }
      }
    }
    case 'ADD_CARD': {
      let { board, curPage, size, color, text } = action.payload
      let newData = [...state.cardData]
      let boardIndex
      for (let i = 0; i < newData.length; i++) { 
        if(newData[i].id === board){
          boardIndex = i
        }
      }
      let newList = newData[boardIndex].data[curPage - 1].data

      newList = [
        ...newList, {
          id: newList.length > 0 ? newList[newList.length - 1].id + 1 : 1,
          size: size,
          color: color,
          position: { x: 0, y: 0 },
          text: text,
          isNew: true
        }]

      newData[boardIndex].data[curPage - 1] = {
        ...newData[boardIndex].data[curPage - 1],
        id: curPage,
        data: newList
      }

      return {
        ...state,
        cardData: newData
      }
    }
    case 'UPDATE_POSITION': {
      let { board, curPage, id, position } = action.payload
      let newData = [...state.cardData]
      let boardIndex
      for (let i = 0; i < newData.length; i++) { 
        if(newData[i].id === board){
          boardIndex = i
        }
      }
      let newList = newData[boardIndex].data[curPage - 1].data
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].id == id) {
          newList[i].position = { ...position }
          newList[i].isNew = false
        }
      }

      newData[boardIndex].data[curPage - 1] = {
        ...newData[boardIndex].data[curPage - 1],
        id: curPage,
        data: newList
      }

      return {
        ...state,
        cardData: newData
      }
    }
    case 'CHECK_PANEL': {
      const check = action.payload
      if (check == 1) {
        newState.toolbarOpen = false;
      }
      return newState;
    }
    case 'ADD_BOARD': {
      let newLineData = {
        id: state.lineData.length > 0 ? state.lineData[state.lineData.length - 1].id + 1 : 1,
        data: [{ id: 1, line: [], color: [], size: [] }]
      }
      let newCardData = {
        id: state.cardData.length > 0 ? state.cardData[state.cardData.length - 1].id + 1 : 1,
        data: [
          { id: 1, data: [] },
        ]
      }
      let newBoardData = {
        id: state.boardData.length > 0 ? state.boardData[state.boardData.length - 1].id + 1 : 1,
        name: 'Untitled Coop',
        img: ''
      }
      return {
        ...state,
        lineData: [
          ...state.lineData,
          newLineData
        ],
        cardData: [
          ...state.cardData,
          newCardData
        ],
        boardData: [
          ...state.boardData,
          newBoardData
        ]
      }
    }
    case 'CHANGE_BOARD_IMG': {
      let { board, img } = action.payload
      let newBoardData = [...state.boardData]
      let boardIndex
      for (let i = 0; i < newBoardData.length; i++) { 
        if(newBoardData[i].id === board){
          boardIndex = i
        }
      }
      newBoardData[boardIndex].img = img
      return {
        ...state,
        boardData: newBoardData
      }
    }
    case 'ADD_RECENT_BOARD': {
      let { board } = action.payload
      let newRecentBoardData = [...state.recentBoardData]
      let boardIndex
      for (let i = 0; i < state.boardData.length; i++) { 
        if(state.boardData[i].id === board){
          boardIndex = i
        }
      }
      for (let i = 0; i < newRecentBoardData.length; i++) {
        if (newRecentBoardData[i].id == board) {
          newRecentBoardData.splice(i, 1)
        }
      }
      newRecentBoardData = [
        state.boardData[boardIndex]
        , ...newRecentBoardData
      ]
      if (newRecentBoardData.length > 4) {
        newRecentBoardData.pop()
      }
      return {
        ...state,
        recentBoardData: newRecentBoardData
      }
    }
    case 'DELETE_CARD': {
      let { board, curPage, id } = action.payload
      let newData = [...state.cardData]
      let boardIndex
      for (let i = 0; i < newData.length; i++) { 
        if(newData[i].id === board){
          boardIndex = i
        }
      }
      let newList = newData[boardIndex].data[curPage - 1].data

      for (let i = 0; i < newList.length; i++) {
        if (newList[i].id == id) {
          newList.splice(i, 1)
        }
      }
      newData[boardIndex].data[curPage - 1].data = newList
      return {
        ...state,
        cardData: newData
      }
    }
    case 'ON_CANVAS': {
      let onCanvas = action.payload
      let onDropArea = state.isDrop && onCanvas
      return {
        ...state,
        onCanvas: onCanvas,
        isDrop: false,
        onDropArea: onDropArea
      }
    }
    case 'DELETE_PAGE': {
      let { board, page } = action.payload
      let newLineData = [...state.lineData]
      let newCardData = [...state.cardData]
      let boardIndex
      for (let i = 0; i < newCardData.length; i++) { 
        if(newCardData[i].id === board){
          boardIndex = i
        }
      }
      newLineData[boardIndex].data.splice(page - 1, 1)
      newCardData[boardIndex].data.splice(page - 1, 1)
      return {
        ...state,
        lineData: newLineData,
        cardData: newCardData
      }
    }
    case 'CLEAR_FRAME': {
      let { board, page } = action.payload
      let newLineData = [...state.lineData]
      let newCardData = [...state.cardData]
      let boardIndex
      for (let i = 0; i < newCardData.length; i++) { 
        if(newCardData[i].id === board){
          boardIndex = i
        }
      }
      newLineData[boardIndex].data[page - 1].line = []
      newLineData[boardIndex].data[page - 1].color = []
      newLineData[boardIndex].data[page - 1].size = []
      newCardData[boardIndex].data[page - 1].data = []
      return {
        ...state,
        lineData: newLineData,
        cardData: newCardData
      }
    }
    case 'CHANGE_BOARD_NAME': {
      let { board, name } = action.payload
      let newBoardData = [...state.boardData]
      let newRecentBoardData = [...state.recentBoardData]
      for (let i = 0; i < state.boardData.length; i++) {
        if (newBoardData[i].id === board) {
          newBoardData[i].name = name
        }
      }
      for (let i = 0; i < state.recentBoardData.length; i++) {
        if (newRecentBoardData[i].id === board) {
          newRecentBoardData[i].name = name
        }
      }
      return {
        ...state,
        boardData: newBoardData,
        recentBoardData: newRecentBoardData
      }
    }
    case 'DELETE_BOARD': {
      let { board } = action.payload
      let newBoardData = [...state.boardData]
      let newRecentBoardData = [...state.recentBoardData]
      let newLineData = [...state.lineData]
      let newCardData = [...state.cardData]

      for (let i = 0; i < state.boardData.length; i++) {
        if (state.boardData[i].id === board) {
          newBoardData.splice(i, 1)
        }
      }
      for (let i = 0; i < state.recentBoardData.length; i++) {
        if (state.recentBoardData[i].id === board) {
          newRecentBoardData.splice(i, 1)
        }
      }
      for (let i = 0; i < state.lineData.length; i++) {
        if (state.lineData[i].id === board) {
          newLineData.splice(i, 1)
        }
      }
      for (let i = 0; i < state.cardData.length; i++) {
        if (state.cardData[i].id === board) {
          newCardData.splice(i, 1)
        }
      }

      return {
        ...state,
        lineData: newLineData,
        cardData: newCardData,
        boardData: newBoardData,
        recentBoardData: newRecentBoardData
      }
    }
    default:
      break;
  }
  return state;
}
export default reducer;