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

  /* State */
  isPainting = false;
  isErasing = false;
  isMarking = false;

  /* All line size */
  penWidth = 10;
  eraserWidth = this.penWidth + 2;
  markerWidth = 8;
  unMarkWidth = this.markerWidth + 2;

  cPage = 0;//this.props.stateFromStore.curPage;
  pPage = 0;
  lineCount = 0;//this.props.stateFromStore.data[this.cPage].line.length;
  // Different stroke styles to be used for user and guest
  userStrokeStyle = '#EE92C2';
  guestStrokeStyle = '#F0C987';
  eraserStyle = '#FFFFFF';
  markerStyle = '#FF0000';
  line = [];
  // v4 creates a unique id for each user. We used this since there's no auth to tell users apart
  userId = v4();
  prevPos = { offsetX: 0, offsetY: 0 };

  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    if (this.props.stateFromStore.buttonData[1].isActive == 1){
      this.isPainting = true;
      this.prevPos = { offsetX, offsetY };
    }
    else if (this.props.stateFromStore.buttonData[2].isActive == 1){
      this.isErasing = true;
      this.prevPos = { offsetX, offsetY };
    }
    else if (this.props.stateFromStore.buttonData[3].isActive == 1){
      this.redraw();
    }
    else if (this.props.stateFromStore.buttonData[5].isActive == 1){
      this.isMarking = true;
      this.prevPos = { offsetX, offsetY };
    }
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
        lineData.line[i].forEach((val) => {
          if ((val.start.offsetX <= positionData.start.offsetX + 25 & val.start.offsetX >= positionData.start.offsetX - 25)
            & (val.start.offsetY <= positionData.start.offsetY + 25 & val.start.offsetY >= positionData.start.offsetY - 25)
            | (val.stop.offsetX <= positionData.stop.offsetX + 25 & val.stop.offsetX >= positionData.stop.offsetX - 25)
            & (val.stop.offsetY <= positionData.stop.offsetY + 25 & val.stop.offsetY >= positionData.stop.offsetY - 25)) {
            //console.log("found");
            this.foundCheck = 1;
          }
        })
        if (this.foundCheck == 1) {
          lineData.line[i].forEach((val) => {
            this.paint(val.start, val.stop, this.eraserStyle, this.eraserWidth);
          })
          this.arrIndex.push(i);
          //console.log(this.arrIndex);
          this.foundCheck = 0;
        }
      }
    }
    else if (this.isMarking & this.props.stateFromStore.buttonData[5].isActive == 1){
      let markData = this.props.stateFromStore.data[this.cPage].marker
      if(markData.length != 0){
        markData[0].forEach((val) => {
          this.unmark(val.start, val.stop, this.eraserStyle, this.unMarkWidth);
        })
        let delMarker = {
          id: this.cPage,
          data: [],
          mode: 3
        };
        this.props.updateLine(delMarker);
      }
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
      this.paint(this.prevPos, offSetData, this.markerStyle, this.markerWidth);
    }
  }
  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
      this.sendPaintData();
      this.lineCount = this.props.stateFromStore.data[this.cPage].line.length;
    }
    else if (this.isErasing) {
      this.isErasing = false;
      this.arrIndex = this.arrIndex.filter((el, i, a) => i === a.indexOf(el));
      this.arrIndex = this.arrIndex.sort(function (a, b) {
        return a - b;
      });
      this.lineCount -= this.arrIndex.length;
      const sendData = {
        id: this.cPage,
        data: this.arrIndex,
        mode: 2
      };
      this.props.updateLine(sendData);
      this.arrIndex = [];
      this.redraw();
    }
    else if (this.isMarking){
      this.isMarking = false;
      let sendData = {
        id: this.cPage,
        data: this.line,
        mode: 3
      };
      this.line = [];
      this.props.updateLine(sendData);
    }
  }

  redraw() {
    let lineData = this.props.stateFromStore.data[this.cPage];
    console.log(lineData);
    let lineCount = lineData.line.length;
    for (let k = 0; k < lineCount; k++) {
      lineData.line[k].forEach((val) => {
        this.paint(val.start, val.stop, this.userStrokeStyle, this.penWidth);
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
    // Visualize the line using the strokeStyle
    this.ctx.stroke();
  }
  /*erase(prevPos, currPos, strokeStyle) {
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

  mark(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;
    this.ctx.lineWidth = 8;
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    // Move the the prevPosition of the mouse
    this.ctx.moveTo(x, y);
    // Draw a line to the current position of the mouse
    this.ctx.lineTo(offsetX, offsetY);
    // Visualize the line using the strokeStyle
    this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  }*/

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
      id: this.cPage,
      data: this.line,
      mode: 1
    };
    this.props.updateLine(dataLine);
    this.line = [];
  }
  componentWillUpdate(){

  }
  componentDidUpdate(){
    this.pPage = this.cPage;
    this.cPage = this.props.stateFromStore.curPage;
    this.lineCount = this.props.stateFromStore.data[this.cPage].line.length;
    /*if(this.pPage == this.cPage){
      this.redraw();
    }*/
    
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