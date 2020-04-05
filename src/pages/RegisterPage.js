import React, { useState } from 'react';
import '.././css/RegisterPage.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';

const RegisterPages = (props) => {

  const [state, setState] = useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    error:{
      firstname:"",
      lastname:"",
      email:"",
      password:""
    }
  })

  const onChangeHandle = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setState({
      [name]:value
    })
  }

  const submitHandle = (event) => {
    event.preventDefault();
    alert("You submitting " + state.firstname)
  }

  return (
    <div className="bg">
      <Card className="register-card" style={{ width: '536px', height: '536px', color: '#C1C1C1' }}>
        <Card.Body>
          <Form onSubmit={submitHandle}>
            <h1 style={{ color: '#D4145A' }}>SIGN UP</h1>
            <h5 style={{ color: '#D4145A' }}>Please fill in this form to create an account!</h5>
            <Form.Row className="mb-2">
              <Col>
              <input type="text" name="firstname" onChange={onChangeHandle} className="form-control" placeholder="First name" />
                {/* <Form.Control placeholder="Fisrt name" /> */}
              </Col>
              <Col>
              <input type="text" name="lastname" onChange={onChangeHandle} className="form-control" placeholder="Last name" />
              </Col>
            </Form.Row>
            <Form.Group className="mb-2">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group>
              <Form.Control className="mb-2" type="password" placeholder="Password" />
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group>
            <div className="text-center">
              <div type="submit" className="btn btn-primary">
                SIGN UP
                  </div>
            </div>
            <h1>
              {state.firstname} {state.lastname}
            </h1>
          </Form>
        </Card.Body>
      </Card>

      {/* <Card>
        <Card.Body>Hello</Card.Body>
      </Card> */}
    </div>
  );
}

export default RegisterPages;