import React from 'react'
import Card from 'react-bootstrap/Card'
import '.././css/BoardList.css';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import Header from '../components/Header.js';

const BoardList = (props) => {

  let history = useHistory();

  const selectHandler = (id) => {
    history.push('/list/' + id)
  }

  const list = props.stateFromStore.boardData.map(
    item =>
      <Card id={item.id} className="card-list m-3" onClick={() => selectHandler(item.id)}>
        <img
          src="https://q-cf.bstatic.com/images/hotel/max1024x768/223/223087771.jpg"
        />
        <Card.Footer>{item.name}</Card.Footer>
      </Card>
  )

  
  return (
    <div>
      <Header path="list"/>
      <div className="ml-5 p-5">
        <div className="mb-3" >All CoopBoard</div>
          <div className="d-flex flex-wrap flex-row">
          {list}
          </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    stateFromStore: state,
    curPage: state.curPage
  }
}
export default connect(mapStateToProps, null)(BoardList);