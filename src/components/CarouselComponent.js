import React, { Component } from 'react';
import Canvas from './Canvas.js';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';

const CarouselComponent = (props) => {
  const mapAllPages = props.stateFromStore.data.map(item => (
    <Carousel.Item key={item.id}> 
      <Canvas data={item} />
    </Carousel.Item>
  ));
  return (
    <Carousel
      activeIndex={props.stateFromStore.curPage}
      controls={false}
      indicators={false}
      onSelect={() => { }}
      className="mt-4 text-center"
      style={{"position":"relative"}}
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