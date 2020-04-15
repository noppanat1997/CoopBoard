const initialState = {
  curPage: 1,
  penColor: '#9E005D',
  penSize: 10,
  //[{start: {offsetX: 325, offsetY: 180},stop: {offsetX: 340, offsetY: 180}}]
  data: [
    { id: 1, line: [], color: [], size: [] },
    { id: 2, line: [], color: [], size: [] },
    { id: 3, line: [], color: [], size: [] },
    { id: 4, line: [], color: [], size: [] }
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
  onDropArea: false,
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
        { id: 1, data: [{ id: 1, size: 'l', color: 'yellow', position: { x: 0, y: 0 }, text: 'Hello Post-It1', isNew: false }] },
        { id: 2, data: [{ id: 1, size: 'l', color: 'yellow', position: { x: 0, y: 0 }, text: 'Hello Post-It2', isNew: false }] },
        { id: 3, data: [{ id: 1, size: 'm', color: 'yellow', position: { x: 0, y: 0 }, text: 'Hello Post-It3', isNew: false }] },
        { id: 4, data: [] }
      ]
    },
    {
      id: 2,
      data: [
        { id: 1, data: [{ id: 1, size: 'l', color: 'yellow', position: { x: 0, y: 0 }, text: 'Hello Post-It1', isNew: false }] },
        { id: 2, data: [{ id: 1, size: 'l', color: 'yellow', position: { x: 0, y: 0 }, text: 'Hello Post-It2', isNew: false }] }
      ]
    }
  ],
  boardData: [
    { id: 1, name: 'board A' },
    { id: 2, name: 'board B' },
    { id: 3, name: 'board C' }
  ]
}
const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'CHANGE_PAGE':
      const { curPage } = action.payload
      if (curPage > state.data.length - 1) {
        return {
          ...state,
          curPage: curPage,
          data: [...state.data, { id: curPage, line: [], marker: [] }]
        }
      } else {
        return {
          ...state,
          curPage: curPage,
        }
      }
    // const changedPage = { curPage: action.payload.curPage }
    // newState.curPage = changedPage.curPage;
    // if (action.payload.curPage > state.data.length - 1) {
    //   newState.data.push({ id: action.payload.curPage, line: [], marker: [] })
    // }
    // return newState


    case 'UPDATE_LINE':
      const { id, data: updatedLineData, mode } = action.payload;
      if (mode == 1) {
        newState.data[id].line.push(updatedLineData);
        newState.data[id].color.push(newState.penColor);
        newState.data[id].size.push(newState.penSize);
      }
      else if (mode == 2) {
        for (var i = updatedLineData.length; i > 0; i--) {
          const t = updatedLineData.pop();
          newState.data[id].line.splice(t, 1);
          newState.data[id].color.splice(t, 1);
          newState.data[id].size.splice(t, 1);
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
      const {present} = action.payload
      newState.isPresent = !newState.isPresent;
      return newState
    
    case 'INVITE_MEMBER':
      const {member} = action.payload
      if(newState.memberCount < 6){
        newState.memberCount += 1;
        console.log(newState.memberCount)
      }
      return newState

    case 'UPDATE_ON_DROP_AREA':
      const { onDropArea, isHolding } = action.payload
      console.log(action.payload)
      return {
        ...state,
        isHolding: isHolding,
        onDropArea: onDropArea
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
      let {board, curPage, size, color, text } = action.payload
      let newData = [...state.cardData]

      let newList = newData[board-1].data[curPage - 1].data
      newList=[...newList, { id: newList.length + 1, size: size, color: color, position: { x: 0, y: 0 }, text: text, isNew: true }]

      newData[board-1].data[curPage - 1] = {
        ...newData[board-1].data[curPage - 1],
        id: curPage -1,
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

      let newList = newData[board-1].data[curPage - 1].data
      newList[id - 1].position = { ...position }
      newList[id - 1].isNew = false

      newData[board-1].data[curPage - 1] = {
        ...newData[board-1].data[curPage - 1],
        id: curPage -1,
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
    default:
      break;
  }
  return state;
}
export default reducer;