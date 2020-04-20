import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Logo from '.././images/logo.svg';
import html2canvas from 'html2canvas';
import history from '.././history';
import '.././css/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.togglePresent = this.togglePresent.bind(this);
    this.inviteMember = this.inviteMember.bind(this);
    let boardIndex
    for (let i = 0; i < this.props.stateFromStore.boardData.length; i++) {
      if(this.props.stateFromStore.boardData[i].id === this.props.board){
        boardIndex = i
      }
    }
    this.state = {
      boardName: this.props.path != "list" ? this.props.stateFromStore.boardData[boardIndex].name : "",
      boardIndex: boardIndex
    }
  }
  str = ""
  memberList = []
  pageChangeHandler(newPage) {
    if (newPage < 1) newPage = 1;
    const newData = { boardId: this.props.board, curPage: newPage };
    this.props.setNewPage(newData);
  }
  togglePresent(e) {
    const payloadData = { present: 1 };
    this.props.changePresent(payloadData);
  }
  randomBackground() {
    var r = Math.floor(Math.random() * 4);
    switch (r) {
      case 0: return "Background-1";
      case 1: return "Background-2";
      case 2: return "Background-3";
      case 3: return "Background-4";
    }
  }
  inviteMember() {
    const payloadData = { member: 1 };
    this.props.increaseMember(payloadData);
  }
  renderMember() {
    let memberCount = this.props.stateFromStore.memberCount;
    // console.log("render!")
    for (let i = this.memberList.length + 1; i < memberCount; i++) {
      this.memberList.push(<div className={"mt-1 member" + this.randomBackground()}>{i}</div>);
    }
    return this.memberList
  }
  componentWillMount() {
    this.str = "user" + this.randomBackground()
  }
  screenShot = () => {
    html2canvas(document.body).then((canvas) => {

      let croppedCanvas = document.createElement('canvas')
      let croppedCanvasContext = croppedCanvas.getContext('2d')

      croppedCanvas.width = 1500;
      croppedCanvas.height = 800;

      croppedCanvasContext.drawImage(canvas, 210, 130, 1500, 800, 0, 0, 1500, 800);

      let base64image = croppedCanvas.toDataURL("image/png");
      this.props.changeBoardImgFn({
        board: this.props.board,
        img: base64image
      });

      this.props.addRecentBoardDataFn({
        board: this.props.board
      })
    });
  }
  deleteFrameHandler = () => {
    let pageLength = this.props.stateFromStore.lineData[this.state.boardIndex].data.length
    if (this.props.page === pageLength) {
      this.pageChangeHandler(this.props.page - 1)
      history.push('/list/' + this.props.board + '/' + (this.props.page - 1));
    }
    this.props.deletePageFn({
      board: this.props.board,
      page: this.props.page
    })
  }
  clearFrameHandler = () => {
    this.props.clearFrameFn({
      board: this.props.board,
      page: this.props.page
    })
  }

  render() {
    return (
      <div className="roboto" style={{ backgroundColor: 'white', width: "100%" }}>
        <Container className="m-0 p-0" style={{ "max-width": "100%", "width": "100%" }}>
          <Row className="justify-content-center m-0 w-100">
            <Col xs={4} style={{ fontSize: '35px' }}>
              {
                this.props.path != "list" ?
                  <input
                    type="text"
                    className="form-control board-name ml-4 mt-3 pl-0"
                    style={{ width: '100%' }}
                    maxlength="24"
                    onBlur={() => {
                      this.props.changeBoardNameFn({
                        board: this.props.board,
                        name: this.state.boardName
                      })
                    }}
                    onChange={(e) => this.setState({
                      ...this.state,
                      boardName: e.target.value
                    })}
                    value={this.state.boardName}
                  ></input>
                  : <div></div>
              }
            </Col>
            <Col xs={4} className="text-center">
              <Link to='/list'>
                <img
                  src={Logo}
                  width="60"
                  height="60"
                  alt="CoopBoard"
                  onClick={() => { if (this.props.path != "list") this.screenShot() }}
                />
              </Link>
            </Col>
            <Col style={{ textAlign: 'right' }}></Col>
            <Col>
              <div className={"ml-5 mt-1 " + this.str}>
                <div className="pt-2">
                  {(this.props.stateFromStore.userData.Name.charAt(0) + this.props.stateFromStore.userData.Surname.charAt(0))}
                </div>
              </div>
            </Col>
          </Row>
          {this.props.path != "list" ?
            <Row className="justify-content-center m-0 w-100 border-top">
              <Col xs={4}>
                <button
                  className="btn button-page mt-1 ml-3 btn-sm border-right"
                  style={{ fontSize: '16px' }}
                  onClick={this.deleteFrameHandler}
                >
                  Delete frame
                </button>
                <button
                  className="btn button-page mt-1 btn-sm"
                  style={{ fontSize: '16px' }}
                  onClick={this.clearFrameHandler}
                >
                  Clear frame
                </button>
              </Col>
              <Col xs={4} className="d-flex ot-1 flex-wrap flex-row justify-content-center">
                <Link to={'/list/' + this.props.board + '/' + (this.props.page > 1 ? (this.props.page - 1) : (this.props.page))}>
                  <button
                    className="btn button-page mt-1 pt-0 btn-sm"
                    onClick={() => this.pageChangeHandler(this.props.page - 1)}
                    style={{ "width": "50px", height: '32px', fontSize: '20px' }}
                  >&#60;</button>
                </Link>
                <div
                  className="text-center mt-1 mb-1 border-right border-left btn-sm"
                  style={{ "width": "70px", fontSize: '16px' }}
                >{this.props.page}</div>
                <Link to={'/list/' + this.props.board + '/' + (this.props.page + 1)}>
                  <button
                    className="btn button-page mt-1 pt-0 btn-sm"
                    onClick={() => this.pageChangeHandler(this.props.page + 1)}
                    style={{ "width": "50px", height: '32px', fontSize: '20px' }}
                  >&#62;</button>
                </Link>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <div className="d-flex flex-row">
                  {this.renderMember()}
                </div>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <button type="button" class="btn btn-info btn-circle" onClick={this.inviteMember}>
                  +
                </button>
                <button className={"mt-1 " + (this.props.stateFromStore.isPresent ? "ispresent-true" : "ispresent-false")}
                  onClick={this.togglePresent}>
                  {this.props.stateFromStore.isPresent ? "Stop Presentation" : "Start Presentation"}
                </button>
              </Col>
            </Row> : <div />}
        </Container>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changePresent: (newPresent) => {
      return dispatch({ type: 'CHANGE_PRESENT', payload: newPresent });
    },
    setNewPage: (newId) => {
      return dispatch({ type: 'CHANGE_PAGE', payload: newId });
    },
    increaseMember: (newMember) => {
      return dispatch({ type: 'INVITE_MEMBER', payload: newMember });
    },
    changeBoardImgFn: (data) => {
      return dispatch({ type: 'CHANGE_BOARD_IMG', payload: data });
    },
    addRecentBoardDataFn: (data) => {
      return dispatch({ type: 'ADD_RECENT_BOARD', payload: data });
    },
    deletePageFn: (data) => {
      return dispatch({ type: 'DELETE_PAGE', payload: data });
    },
    clearFrameFn: (data) => {
      return dispatch({ type: 'CLEAR_FRAME', payload: data });
    },
    changeBoardNameFn: (data) => {
      return dispatch({ type: 'CHANGE_BOARD_NAME', payload: data });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
