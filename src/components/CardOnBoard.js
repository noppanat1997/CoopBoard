import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import '.././css/CardOnBoard.css';

class CardOnBoard extends Component {
  constructor(props) {
    super(props)
    // console.log(this.props.id,this.props.position)
    this.state = {
      deltaPosition: {
        x: this.props.position.x,
        y: this.props.position.y
      },
    }
  }

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      ...this.state,
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };
  handleStop = (e) => {
    let curPage = this.props.stateFromStore.curPage
    let id = this.props.id
    let position = this.state.deltaPosition
    let board = this.props.board
    this.props.updatePositionFn({
      board: board,
      curPage: curPage,
      id: id,
      position: position
    });
  }

  render() {
    return (
      <Draggable
        bounds="parent"
        onDrag={this.handleDrag}
        onStop={this.handleStop}
        position={{ x: this.props.position.x, y: this.props.position.y }}
      >
        <Card
          className={"default-card " + (this.props.color) + '-post' +
            (this.props.size === 's' ? ' small-card' : this.props.size === 'm' ? ' medium-card' : ' large-card')
          }
        >
          <Card.Text className="p-2" >{this.props.text}</Card.Text>
        </Card>
      </Draggable >
    );
  }

}
const mapStateToProps = (state) => {
  return {
    stateFromStore: state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updatePositionFn: (data) => {
      return dispatch({ type: 'UPDATE_POSITION', payload: data });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardOnBoard);