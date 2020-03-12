import React, { Component } from 'react';
import Canvas from './Canvas.js';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import '.././css/Carousel.css';

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
      className="mt-5"
      style={{'position': 'absolute', 'left':'50%','top':'50%','transform': 'translate(-50%,-50%)'}}
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