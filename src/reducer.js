const initialState = {
  curPage: 1,
  data: [
    { id: 1, line: [] },
    { id: 2, line: [] },
    { id: 3, line: [] },
    { id: 4, line: [] }
  ],
  buttonData: {
    1:{ isActive: 0},
    2:{ isActive: 0},
    3:{ isActive: 1},
    4:{ isActive: 0},
    5:{ isActive: 0}
  }
}
const reducer = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case 'CHANGE_PAGE':
      const changedPage = { curPage: action.payload.curPage }
      newState.curPage = changedPage.curPage;
      if (action.payload.curPage > state.data.length - 1) {
        newState.data.push({ id: action.payload.curPage, line: [] })
      }

      console.log(newState)
      return newState

    case 'ADD_LINE':
      const { id, line: newLine } = action.payload;
      newState.data[id].line.push(newLine)

      return newState;
    case 'TOGGLE_BUTTON':
      const { newId, newIsActive } = action.payload;
      const newbuttonData = {
        1:{ isActive: 0},
        2:{ isActive: 0},
        3:{ isActive: 0},
        4:{ isActive: 0},
        5:{ isActive: 0}
      }
      newbuttonData[newId].isActive = newIsActive
      return {
        ...state,
        buttonData: newbuttonData
      }
    default:
      break;
  }
  return state;
}
export default reducer;