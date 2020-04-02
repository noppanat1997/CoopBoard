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
    textAreaCount: 0
  });
  const cancelHendler = () => {
    props.onDropAreaFn({ isHolding: false, onDropArea: false })
  }
  const saveHendler = () => {
    props.onDropAreaFn({ isHolding: false, onDropArea: false })
  }
  return (
    <div>
      <Card className="postit-form">
        <Card.Header className="bg-white">
          <Container>
            <Row>
              <Col xs={4} as="h3" className="p-0 text-left">{props.name}</Col>
              <Col className="p-0"></Col>
              <Col xs={6} className="p-0"></Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body className="lightyellow">
          <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
            <Form.Control maxlength="110" className="text-box" as="textarea" rows="3"
              onChange={(e) => setState({ textAreaCount: e.target.value.length })} />
          </Form.Group>
          <div className="d-flex justify-content-end pr-3">{state.textAreaCount}/110</div>
        </Card.Body>
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormCard);