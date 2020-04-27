import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import '.././css/FormCard.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

const FormCard = (props) => {
  const [state, setState] = useState({
    textAreaCount: 0,
    text: '',
    color: 'yellow',
    ballSelected: 0,
    size: 'm',
    sizeSelected: 1,
    language: 0,
    languageName : ''
  });
  const cancelHendler = () => {
    props.onDropAreaFn({ isHolding: false, isDrop: false })
    props.onCanvasFn(false);
  }
  const saveHendler = (e) => {
    props.onDropAreaFn({ isHolding: false, isDrop: false })
    props.onCanvasFn(false);
    let curPage = props.page
    let text = state.text
    let size = state.size
    let color = state.color
    let board = props.board
    let type = props.name
    // console.log(size)
    if (text.length !== 0) {
      if (props.name === 'Video') {
        text = extractVideoID(text)
        props.addCardFn({ board: board, type: type, curPage: curPage, size: size, color: color, text: text })
      }
      else if (props.name === "Url"){
        let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(text)){
          props.addCardFn({ board: board, type: type, curPage: curPage, size: size, color: color, text: text })
        }
        else{
          cancelHendler();
        }
      }
      else{
        props.addCardFn({ board: board, type: type, curPage: curPage, size: size, color: color, text: text })
      }
    }
    setState({ ...state, textAreaCount: 0, text: '' })
  }
  const languageHandler = (e) => {
    let id = e.target.id
    //console.log(id)
    switch (id) {
      case "cpp" : state.languageName = "C++"; state.language = 1; break
      case "java" : state.languageName = "Java"; state.language = 2; break
      case "php" : state.languageName = "PHP"; state.language = 3; break
      case "arduino" : state.languageName = "Arduino"; state.language = 4; break
      case "python" : state.languageName = "Python"; state.language = 5; break
      default : state.languageName = ""; state.language = 0; break
    }
    console.log(state.languageName)
  }
  const extractVideoID = (url) => {
    let regExp = /[^(?:https?:/{2})?(?:w{3}.)?youtu(?:be)?.(?:com|be)(?:/watch?v=|/)]([^\s&]+)/;
    let match = url.match(regExp);
    return match[0]
  }
  const colorHandler = (e) => {
    // console.log(e.target.getAttribute('name'))
    setState({
      ...state,
      color: e.target.getAttribute('name'),
      ballSelected: e.target.id
    })
  }
  const sizeHandler = (e) => {
    console.log(e.target.getAttribute('name'))
    setState({
      ...state,
      size: e.target.getAttribute('name'),
      sizeSelected: e.target.id
    })
  }
  const postItForm = (
    <Card.Body className={state.color + ' text-area-bg'}>
      <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
        <Form.Control maxlength="40" className="text-box my-card-form-control" as="textarea" rows="3"
          onChange={(e) => setState({ ...state, textAreaCount: e.target.value.length, text: e.target.value })} />
      </Form.Group>
      <div className="d-flex justify-content-end pr-3">{state.textAreaCount}/40</div>
    </Card.Body>
  )
  const videoForm = (
    <Card.Body className="text-area-bg bg-light">
      <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          placeholder="Paste the video link..."
          className="text-box my-card-form-control"
          as="textarea"
          rows="3"
          onChange={(e) => setState({ ...state, textAreaCount: e.target.value.length, text: e.target.value })} />
      </Form.Group>
    </Card.Body>
  )
  const urlForm = (
    <Card.Body className="text-area-bg bg-light">
      <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          placeholder="Paste the URL link..."
          className="text-box my-card-form-control"
          as="textarea"
          rows="3"
          onChange={(e) => setState({ ...state, textAreaCount: e.target.value.length, text: e.target.value })} />
      </Form.Group>
    </Card.Body>
  )
  const codeForm = (
    <Card.Body className='text-area-bg bg-light'>
      <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          placeholder="Paste the code here..."
          className="text-box my-card-form-control"
          as="textarea"
          rows="3"
          onChange={(e) => setState({ ...state, textAreaCount: e.target.value.length, text: e.target.value })} />
      </Form.Group>
    </Card.Body>
  )
  return (
    <div>
      <Card className="postit-form">
        <Card.Header className="bg-white">
          <Container>
            <Row>
              <Col xs={3} as="h4" className="p-0 text-left">{props.name}</Col>
              <Col className="p-0"></Col>
              <Col xs={1} className="p-0 mr-2">
                <div id="0" name="s" className={'text-center mt-2 ' + (state.sizeSelected == 0 ? 'size-ball-active' : 'size-ball')} onClick={sizeHandler}>
                  S
                </div>
              </Col>
              <Col xs={1} className="p-0 mr-2">
                <div id="1" name="m" className={'text-center mt-2 ' + (state.sizeSelected == 1 ? 'size-ball-active' : 'size-ball')} onClick={sizeHandler}>
                  M
                </div>
              </Col>
              <Col xs={1} className="p-0 mr-2">
                <div id="2" name="l" className={'text-center mt-2 ' + (state.sizeSelected == 2 ? 'size-ball-active' : 'size-ball')} onClick={sizeHandler}>
                  L
                </div>
              </Col>
              <Col className="p-0"></Col>
              {
                props.name === 'Post-It' || props.name === 'To-Do-Lists' || props.name === 'Calendar' || props.name === 'Table' ?
                  <>
                    <Col xs={1} className="p-0 mr-2">
                      <div id="0" name="yellow" className={'ball ' + (state.ballSelected == 0 ? 'yellow-active' : 'yellow')} onClick={colorHandler} />
                    </Col>
                    <Col xs={1} className="p-0 mr-2">
                      <div id="1" name="pink" className={'ball ' + (state.ballSelected == 1 ? 'pink-active' : 'pink')} onClick={colorHandler} />
                    </Col>
                    <Col xs={1} className="p-0 mr-2">
                      <div id="2" name="blue" className={'ball ' + (state.ballSelected == 2 ? 'blue-active' : 'blue')} onClick={colorHandler} />
                    </Col>
                    <Col xs={1} className="p-0 mr-2">
                      <div id="3" name="none" className={'ball ' + (state.ballSelected == 3 ? 'none-active' : 'none')} onClick={colorHandler} />
                    </Col></> : props.name === 'Code' ? 
                      <div class="btn-group dropup">
                        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {"Language : " + state.languageName}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                          <button id="cpp" class="dropdown-item" type="button" onClick={languageHandler}>C++</button>
                          <button id="java" class="dropdown-item" type="button" onClick={languageHandler}>Java</button>
                          <button id="php" class="dropdown-item" type="button" onClick={languageHandler}>PHP</button>
                          <button id="arduino" class="dropdown-item" type="button" onClick={languageHandler}>Arduino</button>
                          <button id="python" class="dropdown-item" type="button" onClick={languageHandler}>Python</button>
                        </div>
                      </div> 
                      : <Col xs={4}/>
              }

            </Row>
          </Container>
        </Card.Header>
        {
          props.name === 'Post-It' ? postItForm
            : props.name === 'Checklist' ? postItForm
              : props.name === 'Calendar' ? postItForm
                : props.name === 'Map' ? postItForm
                  : props.name === 'Table' ? postItForm
                    : props.name === 'Url' ? urlForm
                      : props.name === 'Code' ? codeForm
                        : videoForm
        }

        <Card.Footer className="d-flex justify-content-end bg-white">
          <Button variant="outline-dark" className="m-1" onClick={cancelHendler}>Cancel</Button>
          <Button variant="outline-dark" className="m-1" onClick={saveHendler}>Save</Button>
        </Card.Footer>
      </Card>
    </div>
  );

}

const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onDropAreaFn: (onDropArea) => {
      return dispatch({ type: 'UPDATE_ON_DROP_AREA', payload: onDropArea });
    },
    addCardFn: (data) => {
      return dispatch({ type: 'ADD_CARD', payload: data });
    },
    onCanvasFn: (data) => {
      return dispatch({ type: 'ON_CANVAS', payload: data });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormCard);

