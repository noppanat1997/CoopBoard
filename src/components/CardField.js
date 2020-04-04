import React from 'react';
import '.././css/CarouselComponent.css';
import Draggable from 'react-draggable';
import EachCard from './EachCard.js';
const CardField = (props) => {

  return (
    <div>
      <Draggable >
        <div id="1" >
          <EachCard id="1" name={"Post-It"} color={"#D4145A"} />
        </div>
      </Draggable>
    </div>
  );
}

export default CardField;