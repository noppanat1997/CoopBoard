import React from 'react';
import CarouselComponent from './CarouselComponent.js';
import StackCard from './StackCard.js';
import ToolBox from './ToolBox.js';
import ChatBox from './ChatBox.js';

const MainBoard = (props) => {
  return (
    <div>
      <ChatBox />
      <ToolBox />
      <StackCard />
      <CarouselComponent board={props.board}/>
      
    </div>
  );
}

export default MainBoard;