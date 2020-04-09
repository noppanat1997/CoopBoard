import React, { useState } from 'react';
import EachCard from './EachCard.js';
import Draggable from 'react-draggable';
import '.././css/StackCard.css';
import { connect } from 'react-redux';

const StackCard = (props) => {
  const [state, setState] = useState({
    isHolding: false,
    onCard: false
  });
  const onMouseUpHandler = (e) => {
    // console.log(e.screenX, e.screenY)
    setState({ ...state, isHolding: false, onCard: false })
    if (state.onCard) {
      onDropAreaHandler(e.screenX, e.screenY)
    }
  }
  const onDropAreaHandler = (x, y) => {
    // y268 1068 x210 1710
    // console.log(x, y)
    if (y >= 268 && y <= 1068 && x <= 1710 && x >= 210) {
      props.onDropAreaFn({ ...state, isHolding: false, onDropArea: true })
    } else {
      props.onDropAreaFn({ ...state, isHolding: false, onDropArea: false })
    }
  }
  const onMouseMoveHandler = (e) => {
    if (!state.onCard && e.screenY >= 268 && e.screenY <= 1068 && e.screenX <= 1710 && e.screenX >= 210) {
      setState({ ...state, isHolding: false })
      props.onDropAreaFn({ ...state, isHolding: false, onDropArea: false })
    }
  }
  //console.log(state.onCard)
  return (
    <div className={(state.isHolding === true ? 'stack-card-active' : 'stack-card')}
      onMouseOver={() => { setState({ ...state, isHolding: true }) }}
      onMouseMove={onMouseMoveHandler}
      onMouseLeave={() => { setState({ ...state, isHolding: false}) }}
    >
      <Draggable position={{ x: 0, y: 0 }}
        onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}
        onStart={() => { setState({ onCard: true }) }}
        onStop={onMouseUpHandler}
      >
        <div>
          <EachCard id="1" name={"Post-It"} color={"#D4145A"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -100 }}
        onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}
        onStart={() => { setState({ onCard: true }) }}
        onStop={onMouseUpHandler}
      >
        <div>
          <EachCard id="2" name={"To-Do-Lists"} color={"#0071BC"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -200 }}
        onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}
        onStart={() => { setState({ onCard: true }) }}
        onStop={onMouseUpHandler}
      >
        <div>
          <EachCard id="3" name={"Calendar"} color={"#202C5D"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -300 }}
        onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}
        onStart={() => { setState({ onCard: true }) }}
        onStop={onMouseUpHandler}
      >
        <div>
          <EachCard id="4" name={"Map"} color={"#D4145A"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -400 }}
        onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}
        onStart={() => { setState({ onCard: true }) }}
        onStop={onMouseUpHandler}
      >
        <div>
          <EachCard id="5" name={"Table"} color={"#0071BC"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -500 }}
        onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}
        onStart={() => { setState({ onCard: true }) }}
        onStop={onMouseUpHandler}
      >
        <div>
          <EachCard id="6" name={"Url"} color={"#202C5D"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -600 }}
        onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}
        onStart={() => { setState({ onCard: true }) }}
        onStop={onMouseUpHandler}
      >
        <div>
          <EachCard id="7" name={"Code"} color={"#D4145A"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -700 }}
        onMouseDown={() => { props.onDropAreaFn({ isHolding: true, onDropArea: false }) }}
        onStart={() => { setState({ onCard: true }) }}
        onStop={onMouseUpHandler}
      >
        <div>
          <EachCard id="8" name={"Video"} color={"#0071BC"} />
        </div>
      </Draggable>
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