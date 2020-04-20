import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import '.././css/BoardList.css';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import Header from '../components/Header.js';
import { FaEllipsisV, FaTrash } from 'react-icons/fa';
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const BoardList = (props) => {
  let history = useHistory();
  const [state, setState] = useState({
    curBoard: 0
  });

  const selectHandler = (id) => {
    history.push('/list/' + id + '/1')
  }
  const popover = (
    <Popover
      id="popover-basic"
      className="py-2 d-flex flex-column popover-dec"
    >
      <div
        className="button-pop pt-1 pl-2"
        onClick={() => {
          console.log(state.curBoard)
          props.deleteBoardFn({ board: state.curBoard })
        }}
      ><FaTrash /> Remove</div>
    </Popover>
  );
  const list = props.stateFromStore.boardData.map(
    item =>
      <Card
        id={item.id}
        className="card-list m-3"
      >
        <div className="w-100 h-100" style={{ overflow: 'hidden' }} onClick={() => selectHandler(item.id)}>
          {item.img == "" ? <div className="w-100 h-100" /> : <img className="w-100 h-100" src={item.img} />}
        </div>
        <Card.Footer
          className="footer-hover py-1 pr-1 d-flex flex-row justify-content-between"
        >
          <div className="roboto pt-1" style={{ cursor: 'default' }}>
            {item.name}
          </div>
          <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
            <button className="btn button-el" onClick={() => setState({ curBoard: item.id })}><FaEllipsisV /></button>
          </OverlayTrigger>
        </Card.Footer>
      </Card>
  )

  const listRecent = props.stateFromStore.recentBoardData.map(
    item =>
      <Card
        id={item.id}
        className="card-list m-3"
      >
        <div className="w-100 h-100" style={{ overflow: 'hidden' }} onClick={() => selectHandler(item.id)}>
          {item.img == "" ? <div className="w-100 h-100" /> : <img className="w-100 h-100" src={item.img} />}
        </div>
        <Card.Footer
          className="footer-hover py-1 pr-1 d-flex flex-row justify-content-between"
        >
          <div className="roboto pt-1" style={{ cursor: 'default' }}>
            {item.name}
          </div>
          <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
            <button className="btn button-el" onClick={() => setState({ curBoard: item.id })}><FaEllipsisV /></button>
          </OverlayTrigger>
        </Card.Footer>
      </Card>
  )
  return (
    <div>
      <Header path="list" />
      <div className="ml-5 mr-5 p-5">
        <div className="mb-3 roboto" >Recent CoopBoards<hr /></div>
        <div className="d-flex flex-wrap flex-row">
          {listRecent}
        </div>
        <div className="mt-5 mb-3 roboto" >All CoopBoards<hr /></div>
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
                  history.push('/list/' + (props.stateFromStore.boardData[props.stateFromStore.boardData.length - 1].id+1) + '/1');
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
    },
    deleteBoardFn: (data) => {
      return dispatch({ type: 'DELETE_BOARD', payload: data })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BoardList);