const initialState = {
  curPage: 1,
  data: [
    { id: 1, line: [] },
    { id: 2, line: [] },
    { id: 3, line: [] },
    { id: 4, line: [] }
  ]
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
    default:
      break;
  }
  return state;
}
export default reducer;