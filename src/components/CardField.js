import React from "react";
import ".././css/CarouselComponent.css";
import ".././css/CardField.css";
import { connect } from "react-redux";
import CardOnBoard from "./CardOnBoard.js";

const CardField = (props) => {
  // console.log("card field:", props);
  let boardIndex;
  for (let i = 0; i < props.stateFromStore.cardData.length; i++) {
    // console.log(props.stateFromStore.cardData[i].id)
    if (props.stateFromStore.cardData[i].id === props.board) {
      boardIndex = i;
    }
  }
  // console.log(props.stateFromStore.cardData[boardIndex],boardIndex,props.board)
  let cardDataList = [];
  if (
    props.stateFromStore.cardData[boardIndex].data[props.page - 1].data !== null
  ) {
    cardDataList =
      props.stateFromStore.cardData[boardIndex].data[props.page - 1].data;
  }

  // console.log('cdl:', cardDataList)
  let lists = [];
  if (cardDataList.length != 0) {

    for (let i = 0; i < cardDataList.length; i += 1) {
      const item = cardDataList[i];
      let newPosition = {
        x: item.position.x,
        y: item.position.y,
      };

      lists.push(
        <CardOnBoard
          board={props.board}
          type={item.type}
          page={props.page}
          key={item.id}
          id={item.id}
          size={item.size}
          color={item.color}
          text={item.text}
          position={newPosition}
          isNew={item.isNew}
        />
      );
      
    }
  }

  return <div className="w-100 h-100 d-flex flex-wrap flex-row">{lists}</div>;
};
const mapStateToProps = (state) => {
  return {
    stateFromStore: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeBoardImgFn: (data) => {
      return dispatch({ type: "CHANGE_BOARD_IMG", payload: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardField);
