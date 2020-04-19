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
      isHover: false,
      onDelete: false
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
    let curPage = this.props.page
    let id = this.props.id
    let position = this.state.deltaPosition
    let board = this.props.board
    if (this.state.onDelete == false) {
      this.props.updatePositionFn({
        board: board,
        curPage: curPage,
        id: id,
        position: position
      });
    }
  }

  onDelete = () => {
    let curPage = this.props.stateFromStore.curPage
    let id = this.props.id
    let board = this.props.board
    this.props.deleteCardFn({
      board: board,
      curPage: curPage,
      id: id
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
          onMouseEnter={() => this.setState({ ...this.state, isHover: true })}
          onMouseLeave={() => this.setState({ ...this.state, isHover: false })}
          className={"default-card " + (this.props.color) + '-post' +
            (this.props.size === 's' ? ' small-card' : this.props.size === 'm' ? ' medium-card' : ' large-card')
          }
        >
          {this.state.isHover == true ?
            <div
              className={"d-flex justify-content-end w-100 h-100 "
                + (this.state.onDelete == true ? "default-hover-active" : "default-hover")
              }
            >
              <div
                className={" " + (this.state.onDelete == true ? "delete-button-hover" : "delete-button")}
                onPointerOver={() => this.setState({ ...this.state, onDelete: true })}
                onPointerOut={() => this.setState({ ...this.state, onDelete: false })}
                onClick={this.onDelete}
              >
                <div className="w-100 h-100" >
                  ✖
                </div>
              </div>
            </div>
            : <div></div>}
          <Card.Text className="p-2" style={{ position: 'relative' }}>{this.props.text}</Card.Text>
        </Card>
      </Draggable>
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
    },
    changeBoardImgFn: (data) => {
      return dispatch({ type: 'CHANGE_BOARD_IMG', payload: data });
    },
    addRecentBoardDataFn: (data) => {
      return dispatch({ type: 'ADD_RECENT_BOARD', payload: data });
    },
    deleteCardFn: (data) => {
      return dispatch({ type: 'DELETE_CARD', payload: data });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardOnBoard);