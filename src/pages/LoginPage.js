import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '.././css/LoginPage.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Logo from '.././images/logo.svg';

const LoginPage = (props) => {

  const [state, setState] = useState({
    // firstname: "",
    // lastname: "",
    // email: "",
    // password: "",
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

  const checkValidator = (value, rule) => {
    let valid = true;
    let message = '';
    if (value.trim().length === 0 && rule.required) {
      valid = false;
      message = 'จำเป็นต้องกรอก';
    }
    if (value.length < rule.minLength && valid) {
      valid = false;
      message = `น้อยกว่า ${rule.minLength} ตัวอักษร`;
    }
    if (value.length > rule.maxLength && valid) {
      valid = false;
      message = `มากกว่า ${rule.maxLength} ตัวอักษร`;
    }
    if (rule.pattern === 'email' && valid) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) === false) {
        valid = false;
        message = 'กรอกอีเมลไม่ถูกต้อง';
      }
    }
    return { status: !valid, message: message };
  }

  const getInputClass = (name) => {
    const elementErrorStatus = state.formElements[name].error.status;
    // return elementErrorStatus && this.state.formElements[name].touched ?
    //   'form-control is-invalid':
    //   'form-control is-valid';

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

    const validatorObject = checkValidator(value, updatedForm[name].validator);
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
    const formData = {};
    console.log(state.formElements.password, state.formElements.cfpassword)

    for (let name in state.formElements) {
      formData[name] = state.formElements[name].value;
    }

    console.log(formData);
  }

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
                disabled={!state.formElements.email.value, !state.formElements.password.value}
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

export default LoginPage;