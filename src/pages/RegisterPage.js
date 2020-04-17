import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import '.././css/RegisterPage.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import fire from '../components/Fire.js'

import Logo from '.././images/logo.svg';

const RegisterPages = (props) => {
  let history = useHistory();
  const [state, setState] = useState({

    formElements: {
      firstname: {
        type: 'text',
        value: '',
        validator: {
          required: true,
          minLength: 3,
          macLength: 20
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
          macLength: 20
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

  // const onChangeHandle = (event) => {
  //   let name = event.target.name;
  //   let value = event.target.value;
  //   setState({
  //     ...state,
  //     [name]: value
  //   })
  // }

  // const onSubmitHandle = (event) => {
  //   event.preventDefault();
  //   alert("submitting on " + state.firstname + " " + state.lastname)
  // }

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
  const onFromSubmit = (event) => {
    event.preventDefault();
    const formData = {};
    if (state.formElements.password.value !== state.formElements.cfpassword.value) {
      alert("Password not match")
      return false;
    }
    else {
      for (let name in state.formElements) {
        formData[name] = state.formElements[name].value;
      }
      fire.auth().createUserWithEmailAndPassword(state.formElements.email.value, state.formElements.password.value).then((u) => {
      }).then((u) => {
        console.log(u);
        history.push('/login')
      })
        .catch((error) => {
          alert(error.message);
          console.log(error);
        })
    }
    console.log(formData);
  }

  const signup = (event) => {
    event.preventDefault();
    fire.auth().createUserWithEmailAndPassword(state.formElements.email.value, state.formElements.password.value).then((u) => {
    }).then((u) => { console.log(u) })
      .catch((error) => {
        console.log(error);
      })
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
                disabled={!state.formElements.firstname.value, !state.formElements.lastname.value, !state.formElements.email.value
                  , !state.formElements.password.value, !state.formElements.cfpassword.value}
                type="submit"
                className="btn-submit-signup">
                Submit</button>
            </div>

            <div className="text-center">
              <Link to={`/login`}>
                <button
                  className="btn-tosignin btn-link">
                  Already have account?</button>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RegisterPages;