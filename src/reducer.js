const initialState = {
  curPage: 1,
  penColor: '#9E005D',
  penSize: 10,
  //[{start: {offsetX: 325, offsetY: 180},stop: {offsetX: 340, offsetY: 180}}]
  data: [
    { id: 1, line: [], color: [], size: []},
    { id: 2, line: [], color: [], size: []},
    { id: 3, line: [], color: [], size: []},
    { id: 4, line: [], color: [], size: []}
  ],
  buttonData: {
    1: { isActive: 0 },
    2: { isActive: 0 },
    3: { isActive: 1 },
    4: { isActive: 0 },
    5: { isActive: 0 }
  },
  toolbarOpen: 0,
  color: 1,
  size: 2,
  isHolding: false,
  onDropArea: false,
  cardData: {
    1: { onFormSetting: 0,name: 'Post-It', data: {} },
    2: { onFormSetting: 0,name: 'To-Do-Lists', data: {} },
    3: { onFormSetting: 0,name: 'Calendar', data: {} },
    4: { onFormSetting: 0,name: 'Map', data: {} },
    5: { onFormSetting: 0,name: 'Table', data: {} },
    6: { onFormSetting: 0,name: 'Url', data: {} },
    7: { onFormSetting: 0,name: 'Code', data: {} },
    8: { onFormSetting: 0,name: 'Video', data: {} }
  }
}
const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'CHANGE_PAGE':
      const changedPage = { curPage: action.payload.curPage }
      newState.curPage = changedPage.curPage;
      if (action.payload.curPage > state.data.length - 1) {
        newState.data.push({ id: action.payload.curPage, line: [] , marker: []})
      }
      console.log(newState)
      return newState

    case 'UPDATE_LINE':
      const {id, data: updatedLineData , mode} = action.payload;
      if(mode == 1){
        newState.data[id].line.push(updatedLineData);
        newState.data[id].color.push(newState.penColor);
        newState.data[id].size.push(newState.penSize);
      }
      else if(mode == 2){
        for(var i = updatedLineData.length; i > 0;i--){
          const t = updatedLineData.pop();
          newState.data[id].line.splice(t,1);
          newState.data[id].color.splice(t,1);
          newState.data[id].size.splice(t,1);
        }
      }
      return newState;
    
    case 'TOGGLE_BUTTON':
      const { newId, newIsActive } = action.payload;
      //console.log(newId);
      if(newId <= 5 & newId > 0){
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
      else if(newId > 10 & newId < 15){
        newState.color = newId - 10
        switch(newId){
          case '11' : newState.penColor = '#9E005D'; break
          case '12' : newState.penColor = '#D4145A'; break
          case '13' : newState.penColor = '#0071BC'; break
          case '14' : newState.penColor = '#202C5D'; break
          default : console.log("bruh"); break
        }
        return newState
      }
      else if(newId > 20 & newId < 25){
        newState.size = newId - 20
        switch(newId){
          case '21' : newState.penSize = 5; break
          case '22' : newState.penSize = 10; break
          case '23' : newState.penSize = 15; break
          case '24' : newState.penSize = 20; break
        }
        return newState
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
      let newOnFormSetting = state.cardData
      Object.keys(newOnFormSetting).map((key)=> newOnFormSetting[key].onFormSetting = 0)
      newOnFormSetting[cardId].onFormSetting = 1
      return {
        ...state,
        cardData : newOnFormSetting
      }}
    default:
      break;
  }
  return state;
}
export default reducer;