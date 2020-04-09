import React from 'react';
import CarouselComponent from './CarouselComponent.js';
import StackCard from './StackCard.js';
import ToolBox from './ToolBox.js';
import ChatBox from './ChatBox.js';

const MainBoard = () => {
  return (
    <div>
      <ChatBox />
      <ToolBox />
      <StackCard />
      <CarouselComponent />
      
    </div>
  );
}

export default MainBoard;