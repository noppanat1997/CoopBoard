import React, { Component } from 'react';
import Canvas from './Canvas.js';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import '.././css/CarouselComponent.css';

const CarouselComponent = (props) => {
  const mapAllPages = props.stateFromStore.data.map(item => (
    <Carousel.Item key={item.id} className="text-center">
      <Canvas board={props.board} />
    </Carousel.Item>
  ));
  return (
    <Carousel
      activeIndex={props.stateFromStore.curPage}
      controls={false}
      indicators={false}
      onSelect={() => { }}
      className="mt-4"
      style={{ position: "relative"}}
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