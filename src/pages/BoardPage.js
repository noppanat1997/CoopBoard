import React from 'react';
import { connect } from 'react-redux';
import MainBoard from '../components/MainBoard.js';
import FormCard from '../components/FormCard.js';
import '.././css/BoardPages.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const BoardPage = (props) => {

  const pageChangeHandler = (newPage) => {
    if (newPage < 1) newPage = 1;
    const newData = { curPage: newPage };
    props.setNewPage(newData);
  }

  return (
    <div>
      {props.stateFromStore.onDropArea === true &&
        props.stateFromStore.formCardData &&
        Object.entries(props.stateFromStore.formCardData)
          .filter(cardPair => cardPair[1].onFormSetting === 1)
          .map(cardPair => <div className="form-card"><FormCard board={props.match.params.id} key={cardPair[0]} id={cardPair[0]} name={cardPair[1].name} /></div>)}
      <Container className="m-0 p-0" style={{ "max-width": "100%", "width": "100%" }}>
        <Row className="justify-content-center m-0 w-100 border-top bg-light">
          <Col xs={2} className="text-center">
            <button
              className="btn btn-light mt-1 mb-1 btn-sm"
              onClick={() => pageChangeHandler(props.curPage - 1)}
              style={{ "width": "50px" }}
            >&#60;</button>
            <button
              className="btn btn-light mt-1 mb-1 border-right border-left btn-sm"
              style={{ "width": "70px" }}
            >{props.curPage}</button>
            <button
              className="btn btn-light mt-1 mb-1 btn-sm"
              onClick={() => pageChangeHandler(props.curPage + 1)}
              style={{ "width": "50px" }}
            >&#62;</button>
          </Col>
        </Row>
      </Container>
      <MainBoard board={props.match.params.id}/>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);