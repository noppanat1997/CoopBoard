import React from 'react'
import Card from 'react-bootstrap/Card'
import '.././css/BoardList.css';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import Header from '../components/Header.js';

const BoardList = (props) => {
  let history = useHistory();

  const selectHandler = (id) => {
    history.push('/list/' + id + '/1')
  }

  const list = props.stateFromStore.boardData.map(
    item =>
      <Card id={item.id} className="card-list m-3" onClick={() => selectHandler(item.id)}>
        {item.img == "" ? <div className="w-100 h-100" /> : <img src={item.img} />}
        <Card.Footer
          className="footer-hover"
        >
          {item.name}
        </Card.Footer>
      </Card>
  )

  const listRecent = props.stateFromStore.recentBoardData.map(
    item =>
      <Card id={item.id} className="card-list m-3" onClick={() => selectHandler(item.id)}>
        {item.img == "" ? <div className="w-100 h-100" /> : <img src={item.img} />}
        <Card.Footer
          className="footer-hover"
        >
          {item.name}
        </Card.Footer>
      </Card>
  )
  return (
    <div>
      <Header path="list" />
      <div className="ml-5 p-5">
        <div className="mb-3 roboto" >Recent CoopBoards</div>
        <div className="d-flex flex-wrap flex-row">
          {listRecent}
        </div>
        <div className="mb-3 roboto" >All CoopBoards</div>
        <div className="d-flex flex-wrap flex-row">
          <Card
            id="1"
            className="add-card-list m-3"
          >
            <Card.Body className="text-center pt-5">
              <div
                className="text-secondary"
                style={{ fontSize: "60px", userSelect: "none" }}
                onClick={() => {
                  props.addBoardFn();
                }}
              >
                +
              </div>
            </Card.Body>
          </Card>

          {list}

        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addBoardFn: (data) => {
      return dispatch({ type: 'ADD_BOARD', payload: data })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BoardList);