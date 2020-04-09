import React, {useEffect} from 'react';
import '.././css/CarouselComponent.css';
import '.././css/CardField.css';
import { connect } from 'react-redux';
import CardOnBoard from './CardOnBoard.js';

const CardField = (props) => {
  let cardDataList= []
  if (props.stateFromStore.cardData[props.page].data !== null) {
    cardDataList = props.stateFromStore.cardData[props.page].data
  }
  let lists
  if (cardDataList.length != 0) {
    lists = cardDataList.map(item =>
      (
        <CardOnBoard key={item.id} id={item.id} size={item.size} color={item.color} text={item.text} position={item.position}/>
      )
    )
  }
  useEffect(()=>{
    if (cardDataList.length != 0) {
      lists = cardDataList.map(item =>
        (
          <CardOnBoard key={item.id} id={item.id} text={item.text} position={item.position}/>
        )
      )
    }
  },[])
  return (
    <div className="w-100 h-100">
      {lists}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}
// const mapDispatchToProps = dispatch => {
//   return {
//     updateLine: (updateLine) => {
//       return dispatch({ type: 'UPDATE_LINE', payload: updateLine });
//     }
//   }
// }
export default connect(mapStateToProps, null)(CardField);