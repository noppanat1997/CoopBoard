import React, { Component } from 'react';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import '.././css/CarouselComponent.css';
import FormCard from './FormCard.js';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
  }
  arrIndex = [];
  foundCheck = 0;
  isPainting = false;
  isErasing = false;
  cPage = this.props.stateFromStore.curPage;
  lineCount = 0
  // Different stroke styles to be used for user and guest
  userStrokeStyle = '#EE92C2';
  guestStrokeStyle = '#F0C987';
  eraserStyle = '#FFFFFF'
  line = [];
  // v4 creates a unique id for each user. We used this since there's no auth to tell users apart
  userId = v4();
  prevPos = { offsetX: 0, offsetY: 0 };

  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    if (this.props.stateFromStore.buttonData[1].isActive == 1)
      this.isPainting = true;
    else if (this.props.stateFromStore.buttonData[2].isActive == 1)
      this.isErasing = true;
    this.prevPos = { offsetX, offsetY };
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
      this.paint(this.prevPos, offSetData, this.userStrokeStyle);
    }
    else if (this.isErasing & this.props.stateFromStore.buttonData[2].isActive == 1) {
      const { offsetX, offsetY } = nativeEvent;
      const lineData = this.props.stateFromStore.data[this.cPage];
      const offSetData = { offsetX, offsetY };
      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      this.prevPos = { offsetX, offsetY };
      //console.log(positionData.start.offsetX);
      for (var i = 0; i < this.lineCount; i += 1) {
        //console.log();
        lineData.line[i].forEach((val) => { //console.log(val.start,positionData.start)
          if ((val.start.offsetX <= positionData.start.offsetX + 25 & val.start.offsetX >= positionData.start.offsetX - 25)
            & (val.start.offsetY <= positionData.start.offsetY + 25 & val.start.offsetY >= positionData.start.offsetY - 25)
            | (val.stop.offsetX <= positionData.stop.offsetX + 25 & val.stop.offsetX >= positionData.stop.offsetX - 25)
            & (val.stop.offsetY <= positionData.stop.offsetY + 25 & val.stop.offsetY >= positionData.stop.offsetY - 25)) {
            console.log("found");
            this.foundCheck = 1;
          }
        })
        if (this.foundCheck == 1) {
          lineData.line[i].forEach((val) => {
            this.erase(val.start, val.stop, this.eraserStyle);
          })
          this.arrIndex.push(i);
          //console.log(this.arrIndex);
          this.foundCheck = 0;
        }
      }

    }
  }
  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
      this.sendPaintData();
      this.lineCount += 1;
      console.log(this.lineCount);
    }
    else if (this.isErasing) {
      this.isErasing = false;
      this.arrIndex = this.arrIndex.filter((el, i, a) => i === a.indexOf(el));
      this.arrIndex = this.arrIndex.sort(function (a, b) {
        return a - b;
      });
      console.log(this.arrIndex);
      this.lineCount -= this.arrIndex.length;
      const sendData = {
        id: this.cPage,
        data: this.arrIndex,
        mode: 2
      };
      this.props.updateLine(sendData);
      //for(var i = this.arrIndex.length; i > 0;i--){
      //  const t = this.arrIndex.pop();
      //  this.props.stateFromStore.data[this.cPage].line.splice(t,1);
      //  this.lineCount-=1;
      //}
      this.arrIndex = [];
      console.log(this.lineCount);
      this.redraw();
    }
  }

  redraw() {
    let lineData = this.props.stateFromStore.data[this.cPage];
    for (let k = 0; k < this.lineCount; k++) {
      lineData.line[k].forEach((val) => {
        this.paint(val.start, val.stop, this.userStrokeStyle);
      })
    }
  }
  paint(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;
    this.ctx.lineWidth = 10;
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
  erase(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;
    this.ctx.lineWidth = 12;
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
    console.log(this.line)
    const dataLine = {
      id: this.cPage,
      data: this.line,
      mode: 1
    };
    this.props.updateLine(dataLine);
    this.line = [];
  }
  componentDidMount() {
    // Here we set up the properties of the canvas element. 
    this.canvas.width = 1500;
    this.canvas.height = 800;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 10;
  }

  render() {

    return (
      <div>
        {this.props.stateFromStore.isHolding === true &&
          <div className="active-box">
            <h1 className="drag">DROP HERE</h1>
          </div>}
        {this.props.stateFromStore.onDropArea === true &&
          this.props.stateFromStore.cardData &&
          Object.entries(this.props.stateFromStore.cardData)
            .filter(cardPair => cardPair[1].onFormSetting)
            .map(cardPair => <div className="form-card"><FormCard key={cardPair[0]} id={cardPair[0]} /></div>)}
        <canvas
          // We use the ref attribute to get direct access to the canvas element. 
          ref={(ref) => (this.canvas = ref)}
          style={{ 'background': 'white', 'border': '2px solid #eeeeee', position: "relative" }}
          onMouseDown={this.onMouseDown}
          onMouseLeave={this.endPaintEvent}
          onMouseUp={this.endPaintEvent}
          onMouseMove={this.onMouseMove}
        />
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
  //return {
  //  addLine: (addLine) => {
  //    return dispatch({ type: 'ADD_LINE', payload: addLine});
  //  }
  //}
  return {
    updateLine: (updateLine) => {
      return dispatch({ type: 'UPDATE_LINE', payload: updateLine });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Canvas);