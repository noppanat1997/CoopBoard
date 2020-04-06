import React from 'react';
import '.././css/CarouselComponent.css';
import Draggable from 'react-draggable';
import EachCard from './EachCard.js';
import '.././css/CardField.css';
import { connect } from 'react-redux';

const CardField = (props) => {
  const cardDataList = props.stateFromStore.cardData[props.page].data
  let lists
  if (cardDataList.length !== 0) {
    lists = cardDataList.map(item =>
      (
        <Draggable key={item.id}>
          <div>
            <EachCard id="1" name={item.text} color={"#D4145A"} />
          </div>
        </Draggable>
      ))
  }
  return (
    <div>
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