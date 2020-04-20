import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import '.././css/CardOnBoard.css';
import YouTube from 'react-youtube'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
  videoOnReady(event) {
    event.target.pauseVideo()
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
    const opts = {
      height: (this.props.size === 's' ? '195' : this.props.size === 'm' ? '312' : '390'),
      width: (this.props.size === 's' ? '320' : this.props.size === 'm' ? '512' : '640'),
      playerVars: { 
        autoplay: 1
      }
    }
    const hoverEvent = (
      <div
        className={"w-100 h-100 d-flex justify-content-between "
          + (this.state.onDelete == true ? "default-hover-active" : "default-hover")
        }
      >
        <Row className="w-100 m-0 d-flex justify-content-between">
          <Col xs={12} className="d-flex justify-content-end p-0">
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
          </Col>
        </Row>

      </div>
    )
    const postItCard = (
      <Card
        onMouseEnter={() => this.setState({ ...this.state, isHover: true })}
        onMouseLeave={() => this.setState({ ...this.state, isHover: false })}
        className={"default-card " + (this.props.color) + '-post' +
          (this.props.size === 's' ? ' small-card' : this.props.size === 'm' ? ' medium-card' : ' large-card')
        }
      >
        <strong><Card.Title className="drag-title"></Card.Title></strong>
        {this.state.isHover == true ? hoverEvent : <div></div>}
        <Card.Text className="p-2" style={{ position: 'relative' }}>{this.props.text}</Card.Text>
      </Card>
    )
    const videoCard = (
      <Card
        onMouseEnter={() => this.setState({ ...this.state, isHover: true })}
        onMouseLeave={() => this.setState({ ...this.state, isHover: false })}
        className={"default-card " + (this.props.color) + '-post' +
          (this.props.size === 's' ? ' small-vid' : this.props.size === 'm' ? ' medium-vid' : ' large-vid')
        }
      >
        <strong><Card.Title className="drag-title"></Card.Title></strong>
        {this.state.isHover == true ? hoverEvent : <div></div>}
        <YouTube
          videoId={this.props.text}
          opts={opts}
          onReady={this.videoOnReady}
          onPlay={this.videoOnPlay}
          onStateChange={this.videoStateChange}
        />
      </Card>
    )

    return (
      <Draggable
        handle="strong"
        bounds="parent"
        onDrag={this.handleDrag}
        onStop={this.handleStop}
        defaultposition={{ x: this.props.position.x, y: this.props.position.y }}
      >
        {
          this.props.type === 'Post-It' ? postItCard
            : this.props.type === 'Checklist' ? postItCard
              : this.props.type === 'Calendar' ? postItCard
                : this.props.type === 'Map' ? postItCard
                  : this.props.type === 'Table' ? postItCard
                    : this.props.type === 'Url' ? postItCard
                      : this.props.type === 'Code' ? postItCard
                        : videoCard
        }
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