import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Logo from '.././images/logo.svg';

const Header = (props) => {
  const pageChangeHandler = (newPage) => {
    if (newPage < 1) newPage = 1;
    const newData = { curPage: newPage };
    props.setNewPage(newData);
  }
  return (
    <div className="bg-light">
      <Container className="m-0 p-0" style={{ "max-width": "100%", "width": "100%" }}>
        <Row className="justify-content-center m-0 w-100">
          <Col xs={2} className="text-center">
            <img src={Logo} width="60" height="60" alt="CoopBoard" />
          </Col>
        </Row>
        <Row className="justify-content-center m-0 w-100 border-top">
          <Col xs={2} className="text-center">
            <button
              className="btn btn-light mt-1 mb-1 btn-sm"
              onClick={() => pageChangeHandler(props.curPage - 1)}
              style={{"width":"50px"}}
            >&#60;</button>
            <button className="btn btn-light mt-1 mb-1 border-right border-left btn-sm" style={{"width":"70px"}}>{props.curPage}</button>
            <button
              className="btn btn-light mt-1 mb-1 btn-sm"
              onClick={() => pageChangeHandler(props.curPage + 1)}
              style={{"width":"50px"}}
            >&#62;</button>
          </Col>
        </Row>
      </Container>
    </div >
  );
}
const mapStateToProps = state => {
  return {
    stateFromStore: state,
    curPage: state.curPage
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setNewPage: (newId) => {
      return dispatch({ type: 'CHANGE_PAGE', payload: newId })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);