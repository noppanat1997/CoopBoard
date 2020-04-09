import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import '.././css/CardOnBoard.css';

const CardOnBoard = (props) => {
  const [state, setState] = useState({
    deltaPosition: {
      x: 0, y: 0
    },
  });

  useEffect(() => {
    setState({
      ...state,
      deltaPosition: {
        x: props.position.x,
        y: props.position.y - ((props.id - 1) * 200),
      }
    });
  }, [])
  const handleDrag = (e, ui) => {
    const { x, y } = state.deltaPosition;
    // console.log(x, '   ', y)
    setState({
      ...state,
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };
  const handleStop = (e) => {
    let curPage = props.stateFromStore.curPage
    let id = props.id
    let { x, y } = state.deltaPosition
    props.updatePositionFn({
      curPage,
      id,
      x,
      y
    });
  }

  return (
    <Draggable
      bounds="parent"
      onDrag={handleDrag}
      onStop={handleStop}
      defaultPosition={{ x: props.position.x, y: props.position.y - ((props.id - 1) * 160) }}
    >
      <Card
        className={"default-card " + (props.color) + '-post' +
          (props.size === 's' ? ' small-card' : props.size === 'm' ? ' medium-card' : ' large-card')
        }
      >
      <Card.Text className="p-2" >{props.text}</Card.Text>
      </Card>
    </Draggable >
  );
}
const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updatePositionFn: (data) => {
      return dispatch({ type: 'UPDATE_POSITION', payload: data });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardOnBoard);