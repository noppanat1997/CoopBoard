import React from 'react';
import CarouselComponent from './CarouselComponent.js';
import StackCard from './StackCard.js';
import ToolBox from './ToolBox.js';


const MainBoard = () => {
  return (
    <div>
      
      <ToolBox />
      <StackCard />
      <CarouselComponent />
      
    </div>
  );
}

export default MainBoard;