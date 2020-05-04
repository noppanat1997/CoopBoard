import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import ".././css/CardOnBoard.css";
import YouTube from "react-youtube";
import { ReactTinyLink } from "react-tiny-link";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-markup-templating.js";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-php";
import "prismjs/components/prism-arduino";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import ".././css/prism.css";
import '.././css/base_style.css'
import '.././css/date_picker.css'
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import ".././css/CheckList.css";
import SimpleReactCalendar from 'simple-react-calendar'
//cpp,java,php,arduino,py
import * as action from "../actions";

class CardOnBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deltaPosition: {
        x: this.props.position.x,
        y: this.props.position.y,
      },
      isHover: false,
      onDelete: false,
      grid: this.props.text,
      language: this.props.language,
    };

    this.handleDrag = this.handleDrag.bind(this);
    this.videoOnReady = this.videoOnReady.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  videoOnReady(event) {
    event.target.pauseVideo();
  }
  handleDrag(e, ui) {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      ...this.state,
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  }

  handleStop(e) {
    let curPage = this.props.page;
    let id = this.props.id;
    let position = this.state.deltaPosition;
    let board = this.props.board;
    if (this.state.onDelete == false) {
      //REVIEW update position
      this.props.updatePositionFn({
        board: board,
        curPage: curPage,
        id: id,
        position: position,
      });
    }
  }
  genChecklist(){
    if(this.props.type === 'Checklist'){
      let i = 0;
      let list = [];
      console.log(this.props.text)
      list = Object.keys(this.props.text).map((i, j) => {
        return (
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id={i}/>
            <label class="form-check-label" for={i}>
              {this.props.text[i].text}
            </label>
          </div>
      )})
      return list
    }
  }
  onDelete() {
    let curPage = this.props.page;
    let id = this.props.id;
    let board = this.props.board;
    this.props.deleteCardFn({
      board: board,
      curPage: curPage,
      id: id,
    });
  }

  render() {
    const opts = {
      height:
        this.props.size === "s"
          ? "195"
          : this.props.size === "m"
          ? "312"
          : "390",
      width:
        this.props.size === "s"
          ? "320"
          : this.props.size === "m"
          ? "512"
          : "640",
      playerVars: {
        autoplay: 1,
      },
    };
    const hoverEvent = (
      <div
        className={
          "w-100 h-100 d-flex justify-content-between " +
          (this.state.onDelete == true
            ? "default-hover-active"
            : "default-hover")
        }
      >
        <Row className="w-100 m-0 d-flex justify-content-between">
          <Col xs={12} className="d-flex justify-content-end p-0">
            <div
              className={
                " " +
                (this.state.onDelete == true
                  ? "delete-button-hover"
                  : "delete-button")
              }
              onPointerOver={() =>
                this.setState({ ...this.state, onDelete: true })
              }
              onPointerOut={() =>
                this.setState({ ...this.state, onDelete: false })
              }
              onClick={this.onDelete}
            >
              <div className="w-100 h-100">✖</div>
            </div>
          </Col>
        </Row>
      </div>
    );
    const checklistCard = (
      <Card
        onMouseEnter={() => this.setState({ ...this.state, isHover: true })}
        onMouseLeave={() => this.setState({ ...this.state, isHover: false })}
        className={
          "default-card " +
          this.props.color +
          "-post" +
          (this.props.size === "s"
            ? " small-card"
            : this.props.size === "m"
            ? " medium-card"
            : " large-card")
        }
      >
        <strong>
          <Card.Title className="drag-title"></Card.Title>
        </strong>
        {this.state.isHover == true ? hoverEvent : <div></div>}
        <div>Checklist</div>
        {this.genChecklist()}
      </Card>
    );
    const postItCard = (
      <Card
        onMouseEnter={() => this.setState({ ...this.state, isHover: true })}
        onMouseLeave={() => this.setState({ ...this.state, isHover: false })}
        className={
          "default-card " +
          this.props.color +
          "-post" +
          (this.props.size === "s"
            ? " small-card"
            : this.props.size === "m"
            ? " medium-card"
            : " large-card")
        }
      >
        <strong>
          <Card.Title className="drag-title"></Card.Title>
        </strong>
        {this.state.isHover == true ? hoverEvent : <div></div>}
        <Card.Text className="p-2" style={{ position: 'relative' }}>{this.props.text}</Card.Text>
      </Card>
    );
    const calendarCard = (
      <Card
        onMouseEnter={() => this.setState({ ...this.state, isHover: true })}
        onMouseLeave={() => this.setState({ ...this.state, isHover: false })}
        className={"default-card"}
      >
        <strong>
          <Card.Title className="drag-title"></Card.Title>
        </strong>
        {this.state.isHover == true ? hoverEvent : <div></div>}
        <SimpleReactCalendar activeMonth={new Date(this.props.text)} selected={new Date(this.props.text)}/>
      </Card>
    );
    const tableCard = (
      <Card
        onMouseEnter={() => this.setState({ ...this.state, isHover: true })}
        onMouseLeave={() => this.setState({ ...this.state, isHover: false })}
        className={"default-card"}
      >
        <strong>
          <Card.Title className="drag-title"></Card.Title>
        </strong>
        {this.state.isHover == true ? hoverEvent : <div></div>}
        <ReactDataSheet
          data={this.props.text}
          valueRenderer={(cell) => cell.value}
          onCellsChanged={(changes) => {
            const grid = this.state.grid.map((row) => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              grid[row][col] = { ...grid[row][col], value };
            });
            this.setState({ grid });
          }}
        />
      </Card>
    );
    const videoCard = (
      <Card
        onMouseEnter={() => this.setState({ ...this.state, isHover: true })}
        onMouseLeave={() => this.setState({ ...this.state, isHover: false })}
        className={
          "default-card " +
          this.props.color +
          "-post" +
          (this.props.size === "s"
            ? " small-vid"
            : this.props.size === "m"
            ? " medium-vid"
            : " large-vid")
        }
      >
        <strong>
          <Card.Title className="drag-title"></Card.Title>
        </strong>
        {this.state.isHover == true ? hoverEvent : <div></div>}
        <YouTube
          videoId={this.props.text}
          opts={opts}
          onReady={this.videoOnReady}
          onPlay={this.videoOnPlay}
          onStateChange={this.videoStateChange}
        />
      </Card>
    );
    const urlCard = (
      <Card
        onMouseEnter={() => this.setState({ ...this.state, isHover: true })}
        onMouseLeave={() => this.setState({ ...this.state, isHover: false })}
        className={"default-card"}
      >
        <strong>
          <Card.Title className="drag-title"></Card.Title>
        </strong>
        {this.state.isHover == true ? hoverEvent : <div></div>}
        <ReactTinyLink
          cardSize={this.props.size === "s" ? "small" : "large"}
          showGraphic={true}
          maxLine={2}
          minLine={1}
          url={this.props.text}
        />
      </Card>
    );
    const codeCard = (
      <Card
        onMouseEnter={() => this.setState({ ...this.state, isHover: true })}
        onMouseLeave={() => this.setState({ ...this.state, isHover: false })}
        className={"default-card"}
      >
        <strong>
          <Card.Title className="drag-title"></Card.Title>
        </strong>
        {this.state.isHover == true ? hoverEvent : <div></div>}
        <Editor
          className="code-style"
          value={this.props.text}
          onValueChange={(code) => this.setState({ code })}
          highlight={
            this.state.language === 1
              ? (code) => highlight(code, languages.cpp)
              : this.state.language === 2
              ? (code) => highlight(code, languages.java)
              : this.state.language === 3
              ? (code) => highlight(code, languages.php)
              : this.state.language === 4
              ? (code) => highlight(code, languages.arduino)
              : this.state.language === 5
              ? (code) => highlight(code, languages.python)
              : (code) => highlight(code, languages.javascript)
          }
          padding={10}
          style={this.props.size === "s" ? {
            color: "white",
            background: "#121212",
            fontFamily: '"Consolas" ,"monaco" ,monospace',
            fontSize: 10,
          } : this.props.size === "m" ? {
            color: "white",
            background: "#121212",
            fontFamily: '"Consolas" ,"monaco" ,monospace',
            fontSize: 20,
          } : {
            color: "white",
            background: "#121212",
            fontFamily: '"Consolas" ,"monaco" ,monospace',
            fontSize: 30,
          }}
          disabled
        />
        {/*{
            color: "white",
            background: "#121212",
            fontFamily: '"Consolas" ,"monaco" ,monospace',
            fontSize: 16,
          }*/}
      </Card>
    );
    const imageCard = (
      <Card
        onMouseEnter={() => this.setState({ ...this.state, isHover: true })}
        onMouseLeave={() => this.setState({ ...this.state, isHover: false })}
        className={"default-card"}
      >
        <strong>
          <Card.Title className="drag-title"></Card.Title>
        </strong>
        {this.state.isHover == true ? hoverEvent : <div></div>}
        <img src={this.props.text} />
      </Card>
    );
    return (
      <Draggable
        handle="strong"
        bounds="parent"
        onDrag={this.handleDrag}
        onStop={this.handleStop}
        position={{ x: this.props.position.x, y: this.props.position.y }}
      >
        {this.props.type === "Post-It"
          ? postItCard
          : this.props.type === "Checklist"
          ? checklistCard
          : this.props.type === "Calendar"
          ? calendarCard
          : this.props.type === "Image"
          ? imageCard
          : this.props.type === "Table"
          ? tableCard
          : this.props.type === "Url"
          ? urlCard
          : this.props.type === "Code"
          ? codeCard
          : videoCard}
      </Draggable>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    stateFromStore: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updatePositionFn: (data) => {
      return dispatch(action.updatePosition(data));
    },
    changeBoardImgFn: (data) => {
      return dispatch({ type: "CHANGE_BOARD_IMG", payload: data });
    },
    addRecentBoardDataFn: (data) => {
      return dispatch({ type: "ADD_RECENT_BOARD", payload: data });
    },
    deleteCardFn: (data) => {
      return dispatch(action.deleteCard(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardOnBoard);
