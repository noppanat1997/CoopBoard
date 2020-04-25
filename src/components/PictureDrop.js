import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import '.././css/CarouselComponent.css';
import {base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef} from './ResuableUtils'

class PictureDrop extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
              <Draggable>
                <canvas>
                  Test
                </canvas>
              </Draggable>
            </div>
        )
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
      },
      onCanvasFn: (data) => {
        return dispatch({ type: 'ON_CANVAS', payload: data });
      }
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Canvas);