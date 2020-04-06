import React, { useState } from 'react';
import '.././css/RegisterPage.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';

const RegisterPages = (props) => {

  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    error: {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    }
  })

  const onChangeHandle = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setState({
      ...state,
      [name]: value
    })
  }

  const onSubmitHandle = (event) => {
    event.preventDefault();
    alert("submitting on " + state.firstname + " " + state.lastname)
  }

  return (
    <div className="bg">
      <Card className="register-card" style={{ width: '536px', height: '536px', color: '#C1C1C1' }}>
        <Card.Body>
          <Form onSubmit={e => onSubmitHandle(e)}>
            <h1 style={{ color: '#D4145A' }}>SIGN UP</h1>
            <h5 style={{ color: '#D4145A' }}>Please fill in this form to create an account!</h5>
            <Form.Row className="mb-2">
              <Col>
                <input
                  type="text"
                  name="firstname"
                  pattern="[A-Za-z].{2,}"
                  title="3 or more character"
                  onChange={onChangeHandle}
                  className="form-control"
                  placeholder="First name"
                  required />
              </Col>
              <Col>
                <input
                  type="text"
                  name="lastname"
                  pattern=".{2,}"
                  title="3 or more character"
                  onChange={onChangeHandle}
                  className="form-control"
                  placeholder="Last name"
                  required />
              </Col>
            </Form.Row>
            <Form.Group className="mb-2">
              <Form.Control 
              type="email" 
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
              placeholder="Email"
              required />
            </Form.Group>
            <Form.Group>
              <Form.Control className="mb-2" type="password" placeholder="Password" />
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group>
            <div className="text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
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