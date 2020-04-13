import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Logo from '.././images/logo.svg';
import { useHistory } from "react-router-dom";

const Header = (props) => {

  let history = useHistory();

  const logoHandler = () =>{
    history.push('/list');
  }

  return (
    <div className="bg-light" >
      <Container className="m-0 p-0" style={{ "max-width": "100%", "width": "100%" }}>
        <Row className="justify-content-center m-0 w-100">
          <Col xs={2} className="text-center">
            <img src={Logo} width="60" height="60" alt="CoopBoard" onClick={logoHandler} />
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