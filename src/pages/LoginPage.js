import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import '.././css/LoginPage.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import fire from '../components/Fire.js'

import Logo from '.././images/logo.svg';

import * as action from '../actions';
import { connect } from 'react-redux';

const LoginPage = (props) => {
  const { user, userLogin } = props;

  let history = useHistory();
  const [state, setState] = useState({

    currentUser: null,
    formElements: {
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
      formValid: false
    }
  })


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

  const onFromSubmit = (event) => {
    event.preventDefault();

    const username = state.formElements.email.value;
    const password = state.formElements.password.value;

    userLogin(username, password);
    // console.log(user)
    
  }

  

  const logout = () => {
    fire.auth().signOut();
  }

  if (user) {
    // console.log('user?', state.currentUser)
    return (
      <div>
        <p>Hello</p>
        <button onClick={logout}>Logout</button>
      </div>
    )
  }
  else {
    return (
      <div className="background">
        <Card className="login-card" style={{ width: '536px', height: '536px', color: '#C1C1C1' }}>
          <Card.Body>
            <Form onSubmit={e => onFromSubmit(e)}>
              <center>
                <Link to="/list">
                  <img src={Logo} width="200" height="180" alt="CoopBoard" />
                </Link>

              </center>
              <h1 style={{ color: '#D4145A', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold' }}>SIGN IN</h1>

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

              <Form.Group className="mb-2">
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={onFormChange}
                  className={getInputClass('password')}
                />
                <div className="error-msg">{getErrorMessage('password')}<br></br></div>
              </Form.Group>

              <div className="text-center mb-3">
                <button
                  disabled={state.formElements.email.error.status, state.formElements.password.error.status}
                  type="submit"
                  className="btn-submit-signin">
                  Submit</button>
              </div>

              <div className="text-center " >
                <font color="#0071BC" size="4px"> Don't have an account?&nbsp;
                <Link to={`/register`}>
                    <button
                      className="btn-tosignup">
                      Sign Up</button>
                  </Link>
                </font>
              </div>

            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }


}

const mapStateToProps = state => ({
  stateFromStore: state,
  user: state.user,
  currentUser: state.user,
});

const mapDispatchToProps = dispatch => ({
  userLogin: (username, password) => dispatch(action.userLogin(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
