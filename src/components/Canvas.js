import React, { Component } from "react";
import { v4 } from "uuid";
import { connect } from "react-redux";
import ".././css/CarouselComponent.css";
import CardField from "./CardField.js";

import * as action from "../actions";
class Canvas extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
    let boardIndex;
    for (let i = 0; i < this.props.stateFromStore.boardData.length; i++) {
      if (this.props.stateFromStore.boardData[i].id === this.props.board) {
        boardIndex = i;
      }
    }
    // TODO blame someone
    // STUB
    //
    this.state = {
      boardIndex: boardIndex,
      arrIndex: [],
      foundCheck: 0,
      /* State */
      isPainting: false,
      isErasing: false,
      isMarking: false,
      /* All line size */
      penWidth: this.props.stateFromStore.penSize,
      markerWidth: 8,
      unMarkWidth: 10,
      lineCount: 0, //this.props.stateFromStore.data[this.props.stateFromStore.curPage].line.length;
      // Different stroke styles to be used for user and guest
      userStrokeStyle: this.props.stateFromStore.penColor,
      eraserStyle: "#FFFFFF",
      markerStyle: "#FF0000",
      line: [],
      userId: v4(),
      // v4 creates a unique id for each user. We used this since there's no auth to tell users apart
      prevPos: { offsetX: 0, offsetY: 0 },
    };
  }

  onMouseDown({ nativeEvent }) {
    this.state.userStrokeStyle = this.props.stateFromStore.penColor;
    this.state.penWidth = this.props.stateFromStore.penSize;
    const { offsetX, offsetY } = nativeEvent;
    if (this.props.stateFromStore.buttonData[1].isActive == 1) {
      this.state.isPainting = true;
      this.state.prevPos = { offsetX, offsetY };
    } else if (this.props.stateFromStore.buttonData[2].isActive == 1) {
      this.state.isErasing = true;
      this.state.prevPos = { offsetX, offsetY };
    } else if (this.props.stateFromStore.buttonData[5].isActive == 1) {
      this.state.isMarking = true;
      this.state.prevPos = { offsetX, offsetY };
    }
    this.props.panelCheck(1);
  }

  onMouseMove({ nativeEvent }) {
    if (
      this.state.isPainting &
      (this.props.stateFromStore.buttonData[1].isActive == 1)
    ) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.state.prevPos },
        stop: { ...offSetData },
      };
      // Add the position to the line array
      this.state.line = this.state.line.concat(positionData);
      //this.state.line.push(positionData);
      this.paint(
        this.state.prevPos,
        offSetData,
        this.state.userStrokeStyle,
        this.state.penWidth
      );
    } else if (
      this.state.isErasing &
      (this.props.stateFromStore.buttonData[2].isActive == 1)
    ) {
      const { offsetX, offsetY } = nativeEvent;
      const lineData = this.props.stateFromStore.lineData[this.state.boardIndex]
        .data[this.props.stateFromStore.curPage - 1];
      const offSetData = { offsetX, offsetY };
      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.state.prevPos },
        stop: { ...offSetData },
      };
      this.state.prevPos = { offsetX, offsetY };
      for (var i = 0; i < this.state.lineCount; i += 1) {
        lineData.line[i].forEach((val) => {
          if (
            ((val.start.offsetX <= positionData.start.offsetX + 25) &
              (val.start.offsetX >= positionData.start.offsetX - 25) &
              ((val.start.offsetY <= positionData.start.offsetY + 25) &
                (val.start.offsetY >= positionData.start.offsetY - 25))) |
            ((val.stop.offsetX <= positionData.stop.offsetX + 25) &
              (val.stop.offsetX >= positionData.stop.offsetX - 25) &
              ((val.stop.offsetY <= positionData.stop.offsetY + 25) &
                (val.stop.offsetY >= positionData.stop.offsetY - 25)))
          ) {
            this.state.foundCheck = 1;
          }
        });
        if (this.state.foundCheck == 1) {
          lineData.line[i].forEach((val) => {
            this.repaint(
              val.start,
              val.stop,
              this.state.eraserStyle,
              lineData.size[i] + 2
            );
          });
          this.state.arrIndex.push(i);
          this.state.foundCheck = 0;
        }
      }
    } else if (
      this.state.isMarking &
      (this.props.stateFromStore.buttonData[5].isActive == 1)
    ) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.state.prevPos },
        stop: { ...offSetData },
      };
      // Add the position to the line array
      this.state.line = this.state.line.concat(positionData);
      this.paint(
        this.state.prevPos,
        offSetData,
        this.state.markerStyle,
        this.state.markerWidth
      );
    }
  }
  endPaintEvent() {
    if (this.state.isPainting) {
      this.state.isPainting = false;
      this.sendPaintData();
      this.state.lineCount = this.props.stateFromStore.lineData[
        this.state.boardIndex
      ].data[this.props.stateFromStore.curPage - 1].line.length;
    } else if (this.state.isErasing) {
      this.state.isErasing = false;
      this.state.arrIndex = this.state.arrIndex.filter(
        (el, i, a) => i === a.indexOf(el)
      );
      this.state.arrIndex = this.state.arrIndex.sort(function (a, b) {
        return a - b;
      });
      this.state.lineCount -= this.state.arrIndex.length;
      const sendData = {
        boardId: this.props.board,
        pageId: this.props.stateFromStore.curPage - 1,
        data: this.state.arrIndex
      };
      this.props.deleteLine(sendData);
      this.state.arrIndex = [];
      this.redraw();
    } else if (this.state.isMarking) {
      this.state.isMarking = false;
      this.state.line.forEach((val) => {
        this.paint(
          val.start,
          val.stop,
          this.state.eraserStyle,
          this.state.unMarkWidth
        );
      });
      this.state.line = [];
      this.redraw();
    }
  }
  // TODO
  redraw() {
    let lineData = this.props.stateFromStore.lineData[this.state.boardIndex].data[
      this.props.stateFromStore.curPage - 1
    ];
    if (typeof lineData !== "undefined") {
      let lineCount = lineData.line.length;
      for (let k = 0; k < lineCount; k++) {
        lineData.line[k].forEach((val) => {
          this.repaint(
            val.start,
            val.stop,
            lineData.color[k],
            lineData.size[k]
          );
        });
      }
    }
  }

  // FIXME error chip hai
  paint(prevPos, currPos, strokeStyle, lineWidth) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    // Move the the prevPosition of the mouse
    this.ctx.moveTo(x, y);
    // Draw a line to the current position of the mouse
    this.ctx.lineTo(offsetX, offsetY);
    // Visualize the line using the strokeStyle
    this.ctx.stroke();
    this.state.prevPos = { offsetX, offsetY };
  }

  repaint(prevPos, currPos, strokeStyle, lineWidth) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    // Move the the prevPosition of the mouse
    this.ctx.moveTo(x, y);
    // Draw a line to the current position of the mouse
    this.ctx.lineTo(offsetX, offsetY);
    // Visualize the line using the strokeStylSe
    this.ctx.stroke();
  }
  async sendPaintData() {
    const body = {
      line: this.state.line,
      userId: this.state.userId,
    };
    // console.log(this.props.stateFromStore)
    const dataLine = {
      boardId: this.props.board,
      pageId: this.props.page,
      data: this.state.line,
      color: this.props.stateFromStore.penColor,
      size: this.props.stateFromStore.penSize,
    };
    console.log(dataLine);
    this.props.addLine(dataLine);
    this.state.line = [];
  }
//FIXME didMount
  componentDidMount() {
    // Here we set up the properties of the canvas element.
    this.canvas.width = 1500;
    this.canvas.height = 800;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";
    this.ctx.lineWidth = 10;
    let boardIndex;
    for (let i = 0; i < this.props.stateFromStore.boardData.length; i++) {
      if (this.props.stateFromStore.boardData[i].id === this.props.board) {
        boardIndex = i;
        console.log(boardIndex)
      }
    }
    this.setState({
      boardIndex: boardIndex,
      lineCount: this.props.stateFromStore.lineData[boardIndex].data[
        this.props.stateFromStore.curPage - 1
      ].line.length,
    });
    // console.log(this.state.lineCount)
    this.redraw();
  }
  componentWillUnmount() {
    let lineData = this.props.stateFromStore.lineData[this.state.boardIndex].data[
      this.props.stateFromStore.curPage - 1
    ];
    if (typeof lineData !== "undefined") {
      let lineCount = lineData.line.length;
      for (let k = 0; k < lineCount; k++) {
        lineData.line[k].forEach((val) => {
          this.repaint(
            val.start,
            val.stop,
            this.state.eraserStyle,
            lineData.size[k] + 2
          );
        });
      }
    }
  }
  render() {
    return (
      <div
        className={
          (this.props.stateFromStore.buttonData[1].isActive
            ? "pencilCursor"
            : "") +
          (this.props.stateFromStore.buttonData[2].isActive
            ? "erasorCursor"
            : "") +
          (this.props.stateFromStore.buttonData[5].isActive
            ? "pointerCursor"
            : "")
        }
      >
        {this.props.stateFromStore.isHolding === true && (
          <div className="active-box">
            <h1 className="drag">DROP HERE</h1>
          </div>
        )}
        <div
          onMouseEnter={() => {
            if (this.props.stateFromStore.isDrop) this.props.onCanvasFn(true);
          }}
          onMouseLeave={() => {
            if (this.props.stateFromStore.isDrop) this.props.onCanvasFn(false);
          }}
          className={
            this.props.stateFromStore.buttonData[3].isActive == 1
              ? "card-field-active"
              : "card-field"
          }
        >
          <CardField board={this.props.board} page={this.props.page} />
        </div>
        <canvas
          // We use the ref attribute to get direct access to the canvas element.
          ref={(ref) => (this.canvas = ref)}
          onMouseDown={this.onMouseDown}
          onMouseLeave={this.endPaintEvent}
          onMouseUp={this.endPaintEvent}
          onMouseMove={this.onMouseMove}
          className="canvas"
        />
        <div className="paper"></div>
        <div className="field"></div>
      </div>
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
    addLine: (data) => {
      return dispatch(action.addLine(data));
    },
    deleteLine: (updateLine) => {
      return dispatch({ type: "DELETE_LINE", payload: updateLine });
    },
    panelCheck: (check) => {
      return dispatch({ type: "CHECK_PANEL", payload: check });
    },
    onCanvasFn: (data) => {
      return dispatch({ type: "ON_CANVAS", payload: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
