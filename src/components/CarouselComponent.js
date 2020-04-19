import React from 'react';
import Canvas from './Canvas.js';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import '.././css/CarouselComponent.css';

const CarouselComponent = (props) => {
  const mapAllPages = props.stateFromStore.lineData[props.board - 1].data.map((item, index, arr) => (
    <Carousel.Item key={item.id} className="text-center">
      <Canvas board={props.board} page={index + 1} />
    </Carousel.Item>
  ));
  return (
    <Carousel
      activeIndex={props.page - 1}
      controls={false}
      indicators={false}
      onSelect={() => { }}
      className="mt-4"
      style={{ position: "relative" }}
    >
      {mapAllPages}
    </Carousel>
  );
}
const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}
export default connect(mapStateToProps, null)(CarouselComponent);