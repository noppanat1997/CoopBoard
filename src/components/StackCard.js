import React, { useState } from 'react';
import EachCard from './EachCard.js';
import Draggable from 'react-draggable';
import '.././css/StackCard.css';
import { connect } from 'react-redux';

const StackCard = (props) => {
  const [state, setState] = useState({
    isHolding: false,
    deltaPosition: {
      x: 0,
      y: 0
    }
  });
  const onMouseMoveHandler = () => {
    setState({ ...state, isHolding: true })
  }
  const onMouseUpHandler = (e) => {
    setState({ ...state, isHolding: false, deltaPosition: { x: e.screenX, y: e.screenY } })
    onDropAreaHandler(e.screenX, e.screenY)
  }
  const onDropAreaHandler = (x, y) => {
    // y268 1068 x210 1710
    if (y >= 268 && y <= 1068 && x <= 1710 && x >= 210) {
      props.onDropAreaFn({ isHolding: false, onDropArea: true })
    } else {
      props.onDropAreaFn({ isHolding: false, onDropArea: false })
    }
  }

  return (
    <div className={(state.isHolding === true ? 'stack-card-start' : 'stack-card-end')}
      onMouseMove={onMouseMoveHandler}
      onMouseUp={onMouseUpHandler}>
      <Draggable position={{ x: 0, y: 0 }} onMouseDown={(e) => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}>
        <div id="1" style={{ cursor: 'pointer' }} >
          <EachCard id="1" name={"Post-It"} color={"#D4145A"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -100 }} onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}>
        <div style={{ cursor: 'pointer' }}>
          <EachCard id="2" name={"To-Do-Lists"} color={"#0071BC"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -200 }} onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}>
        <div style={{ cursor: 'pointer' }}>
          <EachCard id="3" name={"Calendar"} color={"#202C5D"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -300 }} onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}>
        <div style={{ cursor: 'pointer' }}>
          <EachCard id="4" name={"Map"} color={"#D4145A"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -400 }} onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}>
        <div style={{ cursor: 'pointer' }}>
          <EachCard id="5" name={"Table"} color={"#0071BC"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -500 }} onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}>
        <div style={{ cursor: 'pointer' }}>
          <EachCard id="6" name={"Url"} color={"#202C5D"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -600 }} onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}>
        <div style={{ cursor: 'pointer' }}>
          <EachCard id="7" name={"Code"} color={"#D4145A"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -700 }} onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}>
        <div style={{ cursor: 'pointer' }}>
          <EachCard id="8" name={"Video"} color={"#0071BC"} />
        </div>
      </Draggable>
      {/* <Draggable position={{ x: 0, y: -800 }} onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}>
        <div style={{ cursor: 'pointer' }}>
          <div className="text-light p-3">x: {state.deltaPosition.x.toFixed(0)}, y: {state.deltaPosition.y.toFixed(0)} {props.stateFromStore.onDropArea == true ? 1 : 0}</div>
        </div>
      </Draggable> */}
    </div>

  );
}
const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onDropAreaFn: (onDropArea) => {
      return dispatch({ type: 'UPDATE_ON_DROP_AREA', payload: onDropArea });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StackCard);