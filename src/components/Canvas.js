import React, { Component } from 'react';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import '.././css/CarouselComponent.css';
import CardField from './CardField.js';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
  }
  arrIndex = [];
  foundCheck = 0;

  /* State */
  isPainting = false;
  isErasing = false;
  isMarking = false;

  /* All line size */
  penWidth = this.props.stateFromStore.penSize;
  markerWidth = 8;
  unMarkWidth = 10;

  cPage = 0;//this.props.stateFromStore.curPage;
  pPage = 0;
  lineCount = 0;//this.props.stateFromStore.data[this.cPage].line.length;
  // Different stroke styles to be used for user and guest
  userStrokeStyle = this.props.stateFromStore.penColor;
  eraserStyle = '#FFFFFF';
  markerStyle = '#FF0000';
  line = [];
  // v4 creates a unique id for each user. We used this since there's no auth to tell users apart
  userId = v4();
  prevPos = { offsetX: 0, offsetY: 0 };

  onMouseDown({ nativeEvent }) {
    this.userStrokeStyle = this.props.stateFromStore.penColor;
    this.penWidth = this.props.stateFromStore.penSize;
    const { offsetX, offsetY } = nativeEvent;
    if (this.props.stateFromStore.buttonData[1].isActive == 1) {
      this.isPainting = true;
      this.prevPos = { offsetX, offsetY };
    }
    else if (this.props.stateFromStore.buttonData[2].isActive == 1) {
      this.isErasing = true;
      this.prevPos = { offsetX, offsetY };
    }
    else if (this.props.stateFromStore.buttonData[3].isActive == 1) {
      this.redraw();
    }
    else if (this.props.stateFromStore.buttonData[5].isActive == 1) {
      this.isMarking = true;
      this.prevPos = { offsetX, offsetY };
    }
    this.props.panelCheck(1);
  }

  onMouseMove({ nativeEvent }) {
    if (this.isPainting & this.props.stateFromStore.buttonData[1].isActive == 1) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      // Add the position to the line array
      this.line = this.line.concat(positionData);
      //this.line.push(positionData);
      this.paint(this.prevPos, offSetData, this.userStrokeStyle, this.penWidth);
    }
    else if (this.isErasing & this.props.stateFromStore.buttonData[2].isActive == 1) {
      const { offsetX, offsetY } = nativeEvent;
      const lineData = this.props.stateFromStore.lineData[this.props.board-1].data[this.cPage-1];
      const offSetData = { offsetX, offsetY };
      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      this.prevPos = { offsetX, offsetY };
      for (var i = 0; i < this.lineCount; i += 1) {
        lineData.line[i].forEach((val) => {
          if ((val.start.offsetX <= positionData.start.offsetX + 25 & val.start.offsetX >= positionData.start.offsetX - 25)
            & (val.start.offsetY <= positionData.start.offsetY + 25 & val.start.offsetY >= positionData.start.offsetY - 25)
            | (val.stop.offsetX <= positionData.stop.offsetX + 25 & val.stop.offsetX >= positionData.stop.offsetX - 25)
            & (val.stop.offsetY <= positionData.stop.offsetY + 25 & val.stop.offsetY >= positionData.stop.offsetY - 25)) {
            this.foundCheck = 1;
          }
        })
        if (this.foundCheck == 1) {
          lineData.line[i].forEach((val) => {
            this.paint(val.start, val.stop, this.eraserStyle, lineData.size[i] + 2);
          })
          this.arrIndex.push(i);
          this.foundCheck = 0;
        }
      }
    }
    else if (this.isMarking & this.props.stateFromStore.buttonData[5].isActive == 1) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      // Add the position to the line array
      this.line = this.line.concat(positionData);
      this.paint(this.prevPos, offSetData, this.markerStyle, this.markerWidth);
    }
  }
  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
      this.sendPaintData();
      this.lineCount = this.props.stateFromStore.lineData[this.props.board-1].data[this.cPage-1].line.length;
    }
    else if (this.isErasing) {
      this.isErasing = false;
      this.arrIndex = this.arrIndex.filter((el, i, a) => i === a.indexOf(el));
      this.arrIndex = this.arrIndex.sort(function (a, b) {
        return a - b;
      });
      this.lineCount -= this.arrIndex.length;
      const sendData = {
        boardId: this.props.board,
        pageId: this.cPage - 1,
        data: this.arrIndex,
        mode: 2
      };
      this.props.updateLine(sendData);
      this.arrIndex = [];
      this.redraw();
    }
    else if (this.isMarking) {
      this.isMarking = false;
      this.line.forEach((val) => {
        this.paint(val.start, val.stop, this.eraserStyle, this.unMarkWidth);
      })
      this.line = [];
      this.redraw()
    }
  }

  redraw() {
    let lineData = this.props.stateFromStore.lineData[this.props.board-1].data[this.cPage-1];
    let lineCount = lineData.line.length;
    for (let k = 0; k < lineCount; k++) {
      lineData.line[k].forEach((val) => {
        this.paint(val.start, val.stop, lineData.color[k], lineData.size[k]);
      })
    }
  }

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
    this.prevPos = { offsetX, offsetY };
  }

  unmark(prevPos, currPos, strokeStyle, lineWidth) {
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
      line: this.line,
      userId: this.userId,
    };
    // We use the native fetch API to make requests to the server
    //  const req = await fetch('http://localhost:4000/paint', {
    //    method: 'post',
    //    body: JSON.stringify(body),
    //    headers: {
    //      'content-type': 'application/json',
    //    },
    //  });
    //  const res = await req.json();
    //console.log(this.line)
    const dataLine = {
      boardId: this.props.board,
      pageId: this.cPage - 1,
      data: this.line,
      mode: 1
    };
    this.props.updateLine(dataLine);
    this.line = [];
  }

  componentDidUpdate() {
    this.pPage = this.cPage;
    this.cPage = this.props.stateFromStore.curPage;
    this.lineCount = this.props.stateFromStore.lineData[this.props.board-1].data[this.cPage-1].line.length;

  }
  componentDidMount() {
    // Here we set up the properties of the canvas element. 
    this.canvas.width = 1500;
    this.canvas.height = 800;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 10;
    //console.log(this.lineCount)
  }

  render() {
    return (
      <div className={(this.props.stateFromStore.buttonData[1].isActive ? "pencilCursor" : "") +
        (this.props.stateFromStore.buttonData[2].isActive ? "erasorCursor" : "") +
        (this.props.stateFromStore.buttonData[5].isActive ? "pointerCursor" : "")}>
        {this.props.stateFromStore.isHolding === true &&
          <div className="active-box">
            <h1 className="drag">DROP HERE</h1>
          </div>}
        <div className={this.props.stateFromStore.buttonData[3].isActive == 1 ? "card-field-active" : "card-field"}>
          <CardField board={this.props.board} page={this.props.stateFromStore.curPage - 1} />
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

const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateLine: (updateLine) => {
      return dispatch({ type: 'UPDATE_LINE', payload: updateLine });
    },
    panelCheck: (check) => {
      return dispatch({ type: 'CHECK_PANEL', payload: check });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Canvas);