import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar'
import Logo from '.././images/logo.svg';

const Header = (props) => {
  const pageChangeHandler = (newPage) => {
    if (newPage < 0) newPage = 0;
    const newData = { curPage: newPage };
    props.setNewPage(newData);
  }
  return (
    <Navbar bg="light" className="pt-0 pb-0" style={{ 'position': 'relatives' }}>
      <Navbar.Brand href="#" className="pt-0 pb-0">
        <img src={Logo} width="60" height="60" className="d-inline-block align-center" alt="CoopBoard" />
        CoopBoard
      </Navbar.Brand>
      <div style={{ 'top': '50%', 'left': '50%', 'position': 'absolute', 'transform': 'translate(-50%,-50%)' }}>
        <button
          className="btn btn-light m-1"
          disabled={props.curPage === 0}
          onClick={() => pageChangeHandler(props.curPage - 1)}
        >&#60;</button>
        <button className="btn btn-light m-1">{props.curPage + 1}</button>
        <button
          className="btn btn-light m-1"
          onClick={() => pageChangeHandler(props.curPage + 1)}
        >&#62;</button>
      </div>
    </Navbar>
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