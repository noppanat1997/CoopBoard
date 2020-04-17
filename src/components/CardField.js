import React, { useEffect, useState } from 'react';
import '.././css/CarouselComponent.css';
import '.././css/CardField.css';
import { connect } from 'react-redux';
import CardOnBoard from './CardOnBoard.js';

const CardField = (props) => {

  let cardDataList = []
  if (props.stateFromStore.cardData[props.board - 1].data[props.page].data !== null) {
    cardDataList = props.stateFromStore.cardData[props.board - 1].data[props.page].data
  }

  let lists
  if (cardDataList.length != 0) {
    lists = cardDataList.map((item) => {
      let newPosition = {
        x: item.position.x,
        y: item.position.y
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
    <div className="w-100 h-100 d-flex flex-wrap flex-row">
      {lists}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changeBoardImgFn: (data) => {
      return dispatch({ type: 'CHANGE_BOARD_IMG', payload: data });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardField);