const initialState = {
  curPage: 1,
  data: [
    { id: 1, line: [] },
    { id: 2, line: [] },
    { id: 3, line: [] },
    { id: 4, line: [] }
  ],
  buttonData: {
    1: { isActive: 0 },
    2: { isActive: 0 },
    3: { isActive: 1 },
    4: { isActive: 0 },
    5: { isActive: 0 }
  },
  isHolding: false,
  onDropArea: false,
  formCardData: {
    1: { onFormSetting: 0,name: 'Post-It' },
    2: { onFormSetting: 0,name: 'To-Do-Lists'},
    3: { onFormSetting: 0,name: 'Calendar'},
    4: { onFormSetting: 0,name: 'Map'},
    5: { onFormSetting: 0,name: 'Table'},
    6: { onFormSetting: 0,name: 'Url'},
    7: { onFormSetting: 0,name: 'Code'},
    8: { onFormSetting: 0,name: 'Video'}
  },
  msgData: {
    1: {id: 1, name: 'server', msg: ['I am server','I am 20 years old']},
    2: {id: 2, name: 'user1', msg: []}
  },
  cardData: {
    1: {data:[]},
    2: {data:[]}
  }
}
const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'CHANGE_PAGE':
      const changedPage = { curPage: action.payload.curPage }
      newState.curPage = changedPage.curPage;
      if (action.payload.curPage > state.data.length - 1) {
        newState.data.push({ id: action.payload.curPage, line: [] })
      }

      console.log(newState)
      return newState

    //case 'ADD_LINE':
    //  const { id, line: newLine } = action.payload;
    //  newState.data[id].line.push(newLine)
    //  return newState;
      
    case 'UPDATE_LINE':
      const {id, data: updatedLineData , mode} = action.payload;
      if(mode == 1){
        newState.data[id].line.push(updatedLineData)
      }
      else if(mode == 2){
        for(var i = updatedLineData.length; i > 0;i--){
          const t = updatedLineData.pop();
          newState.data[id].line.splice(t,1);
        }
      }
      return newState;
    case 'TOGGLE_BUTTON':
      const { newId, newIsActive } = action.payload;
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
    case 'UPDATE_ON_DROP_AREA':
      const { onDropArea, isHolding } = action.payload
      console.log(action.payload)
      return {
        ...state,
        isHolding: isHolding,
        onDropArea: onDropArea
      }
    case 'UPDATE_ON_FORM_SETTING':{
      const cardId = action.payload
      let newOnFormSetting = state.formCardData
      Object.keys(newOnFormSetting).map((key)=> newOnFormSetting[key].onFormSetting = 0)
      newOnFormSetting[cardId].onFormSetting = 1
      return {
        ...state,
        formCardData : newOnFormSetting
      }}
    case 'ADD_MSG':{
      const {userID, userMsg} = action.payload
      return {
        ...state,
        msgData: {...state.msgData, userID: {...state.msgData[userID], msg: state.msgData[userID].msg.push(userMsg)}}
      }
    }
    default:
      break;
  }
  return state;
}
export default reducer;