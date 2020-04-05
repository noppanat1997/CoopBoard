import React from 'react';
import '.././css/CarouselComponent.css';
import Draggable from 'react-draggable';
import EachCard from './EachCard.js';
import '.././css/CardField.css';
const CardField = (props) => {

  return (
    <div>
      <Draggable>
        <div>
          <EachCard id="1" name={"Post-It"} color={"#D4145A"} />
        </div>
      </Draggable>
    </div>
    
  );
}

export default CardField;