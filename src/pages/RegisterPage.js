import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import '.././css/RegisterPage.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import fire from '../components/Fire.js'
import { connect } from 'react-redux';

import * as action from '../actions';

const RegisterPages = (props) => {
  const { user, createUser } = props;
  useEffect(() => {
    if (user) {
      setState({ currentUser: user })
    }
  }, [])

  let history = useHistory();
  const [state, setState] = useState({

    currentUser:null,
    formElements: {
      firstname: {
        type: 'text',
        value: '',
        validator: {
          required: true,
          minLength: 3,
          maxLength: 20
        },
        touched: false,
        error: {
          status: true,
          message: ''
        }
      },
      lastname: {
        type: 'text',
        value: '',
        validator: {
          required: true,
          minLength: 3,
          maxLength: 20
        },
        touched: false,
        error: {
          status: true,
          message: ''
        }
      },
      email: {
        type: 'email',
        value: '',
        validator: {
          required: true,
          pattern: 'email'
        },
        touched: false,
        error: {
          status: true,
          message: ''
        }
      },
      password: {
        type: 'password',
        value: '',
        validator: {
          required: true,
          minLength: 8,
          maxLength: 20
        },
        touched: false,
        error: {
          status: true,
          message: ''
        }
      },
      cfpassword: {
        type: 'cfpassword',
        value: '',
        validator: {
          required: true,
          minLength: 8,
          maxLength: 20
        },
        touched: false,
        error: {
          status: true,
          message: ''
        }
      },
      formValid: false
    }
  })

  const onFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let updatedForm = { ...state.formElements };
    updatedForm[name].value = value;
    updatedForm[name].touched = true;

    const validatorObject = checkValidator(value, updatedForm[name].validator, name);
    updatedForm[name].error = {
      status: validatorObject.status,
      message: validatorObject.message
    }
    if ((name == 'password' || name == 'cfpassword') && state.formElements.cfpassword.value !== state.formElements.password.value) {
      updatedForm['cfpassword'].error = {
        status: true,
        message: 'The password confirmation does not match.'
      }
    }
    else if ((name == 'password' || name == 'cfpassword') && value == '') {
      updatedForm['cfpassword'].error = {
        status: true,
        message: 'The cfpassword is cannot be empty.'
      }
    }

    let formStatus = true;
    for (let name in updatedForm) {
      if (name !== 'formValid' && updatedForm[name].validator.required === true) {
        formStatus = !updatedForm[name].error.status && formStatus;
      }
    }
    setState({
      ...state,
      formElements: updatedForm,
      formValid: formStatus
    });
  }

  const checkValidator = (value, rule, name) => {
    let valid = true;
    let message = '';
    if (value.trim().length === 0 && rule.required) {
      valid = false;
      message = `The ${name} cannot be empty.`;
    }
    else if (value.length < rule.minLength && valid) {
      valid = false;
      message = `The ${name} is less than ${rule.minLength} characters.`;
    }
    else if (value.length > rule.maxLength && valid) {
      valid = false;
      message = `The ${name} is greater than ${rule.maxLength} characters.`;
    }
    else if (rule.pattern === 'email' && valid) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) === false) {
        valid = false;
        message = 'The E-mail is invalid format.';
      }
    }

    return { status: !valid, message: message };
  }
  const getInputClass = (name) => {
    const elementErrorStatus = state.formElements[name].error.status;

    return state.formElements[name].touched ?
      elementErrorStatus ? 'form-control is-invalid' : 'form-control is-valid'
      : 'form-control';
  }
  const getErrorMessage = (name) => {
    return state.formElements[name].error.message;
  }
  const onFromSubmit = (event) => {
    event.preventDefault();
    const username = state.formElements.email.value;
    const password = state.formElements.password.value;
    const firstname = state.formElements.firstname.value;
    const lastname = state.formElements.lastname.value;
    const email = state.formElements.email.value;
    
    createUser(username, password, firstname, lastname, email);
  }
  

  return (
    <div className="bg">
      <Card className="register-card" style={{ width: '536px', height: '536px', color: '#C1C1C1' }}>
        <Card.Body>
          <Form onSubmit={e => onFromSubmit(e)}>
            <h1 style={{ color: '#D4145A', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', marginTop: '20px' }}>SIGN UP</h1>
            <h5 style={{ color: '#D4145A', marginBottom: '20px' }}>Please fill in this form to create an account!</h5>

            <Form.Row className="mb-0">
              <Col>
                <input
                  size="50"
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="First name"
                  // pattern="[A-Za-z].{2,}"
                  // title="3 or more character"
                  onChange={onFormChange}
                  className={getInputClass('firstname')} />
                <div className="error-msg">{getErrorMessage('firstname')}<br></br></div>
              </Col>
              <Col>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Last name"
                  // pattern=".{2,}"
                  // title="3 or more character"
                  onChange={onFormChange}
                  className={getInputClass('lastname')} />
                <div className="error-msg">{getErrorMessage('lastname')}<br></br></div>
              </Col>
            </Form.Row>

            <Form.Group className="mb-0">
              <Form.Control
                type="email"
                id="email"
                name="email"
                // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                placeholder="Email"
                onChange={onFormChange}
                className={getInputClass('email')} />
              <div className="error-msg">{getErrorMessage('email')}<br></br></div>
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Control
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={onFormChange}
                className={getInputClass('password')} />
              <div className="error-msg">{getErrorMessage('password')}<br></br></div>
              <Form.Control
                type="password"
                id="cfpassword"
                name="cfpassword"
                placeholder="Confirm password"
                onChange={onFormChange}
                className={getInputClass('cfpassword')} />
              <div className="error-msg">{getErrorMessage('cfpassword')}<br></br></div>
            </Form.Group>

            <div className="mb-0"></div>
            <div className="text-center mb-2">
              <button
                disabled={state.formElements.firstname.error.status, state.formElements.lastname.error.status, state.formElements.email.error.status
                  , state.formElements.password.error.status, state.formElements.cfpassword.error.status}
                type="submit"
                className="btn-submit-signup">
                Submit</button>
            </div>

            <div className="text-center">
              <Link to={`/login`}>
                <button
                  className="btn-tosignin btn-link">
                  Already have an account?</button>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

const mapStateToProps = state => ({
  stateFromStore: state,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  createUser: (username, password, firstname, lastname, email) => dispatch(action.addUser(username, password, firstname, lastname, email))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPages);
