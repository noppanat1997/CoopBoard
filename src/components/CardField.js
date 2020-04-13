import React, { useEffect } from 'react';
import '.././css/CarouselComponent.css';
import '.././css/CardField.css';
import { connect } from 'react-redux';
import CardOnBoard from './CardOnBoard.js';

const CardField = (props) => {
  let cardDataList = []
  if (props.stateFromStore.cardData[props.board-1].data[props.page].data !== null) {
    cardDataList = props.stateFromStore.cardData[props.board-1].data[props.page].data
  }

  let lists
  if (cardDataList.length !== 0) {
    lists = cardDataList.map(item => {
      // console.log(item.id,item.isNew)
      let positionChanged = item.size === 'm' ? 200 : item.size ==='s'? 150 : 300
      let newPosition = {
        x: item.position.x,
        y: item.isNew ? item.position.y - ((item.id - 1) * positionChanged) :  item.position.y
      }
      return (
        <CardOnBoard
          board={props.board}
          key={item.id}
          id={item.id}
          size={item.size}
          color={item.color}
          text={item.text}
          position={newPosition}
          isNew={item.isNew}
        />
      )
    }
    )
  }

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