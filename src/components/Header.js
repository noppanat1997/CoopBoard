import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from ".././images/logo.svg";
import html2canvas from "html2canvas";
import history from ".././history";
import ".././css/Header.css";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import * as action from "../actions";

class Header extends Component {
  constructor(props) {
    super(props);
    let boardIndex;
    for (let i = 0; i < this.props.stateFromStore.boardData.length; i++) {
      if (this.props.stateFromStore.boardData[i].id === this.props.board) {
        boardIndex = i;
        break;
      }
    }
    this.state = {
      boardName:
        this.props.path != "list"
          ? this.props.stateFromStore.boardData[boardIndex].name
          : "",
      boardIndex: boardIndex,
      Email: "",
      str: "",
      memberList: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onInviteSubmit = this.onInviteSubmit.bind(this);
    this.pageChangeHandler = this.pageChangeHandler.bind(this);
    this.randomBackground = this.randomBackground.bind(this);
    this.onKick = this.onKick.bind(this);
    this.renderMember = this.renderMember.bind(this);
    this.screenShot = this.screenShot.bind(this);
    this.deleteFrameHandler = this.deleteFrameHandler.bind(this);
    this.clearFrameHandler = this.clearFrameHandler.bind(this);
    this.logout = this.logout.bind(this);
  }
  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onInviteSubmit(event) {
    // console.log(this.state)
    const payloadData = {
      memberData: this.state.Email,
      boardId: this.props.board,
      color: this.randomBackground(),
    };
    this.props.inviteMember(payloadData);
  }
  //REVIEW change page
  async pageChangeHandler(newPage) {
    if (newPage < 1) newPage = 1;
    let boardIndex;
    for (let i = 0; i < this.props.stateFromStore.boardData.length; i++) {
      if (this.props.stateFromStore.boardData[i].id === this.props.board) {
        boardIndex = i;
        break;
      }
    }
    // console.log(newPage,this.props.stateFromStore.lineData[boardIndex].data.length)
    if (
      newPage > this.props.stateFromStore.lineData[boardIndex].data.length &&
      newPage > this.props.stateFromStore.cardData[boardIndex].data.length
    ) {
      // console.log('try to call add page fn')
      await this.props.addPageFn(this.props.board);
    }
    this.props.changePageFn(newPage);
    history.push(
      "/list/" +
        this.props.board +
        "/" +
        this.props.stateFromStore.cardData[this.state.boardIndex].data[
          newPage - 1
        ].id
    );
  }
  randomBackground() {
    var r = Math.floor(Math.random() * 4);
    switch (r) {
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 3;
      case 3:
        return 4;
    }
  }
  onKick(e) {
    let i = parseInt(e.target.id.charAt(6));
    const payloadData = {
      boardId: this.props.board,
      memberId: i,
    };
    this.props.kickMember(payloadData);
  }
  renderMember() {
    let boardmemberList = this.props.stateFromStore.memberData[
      this.state.boardIndex
    ].member;
    this.state.memberList = [];
    for (let i = 0; i < boardmemberList.length; i++) {
      let idtype = "member" + i;
      this.state.memberList.push(
        <div>
          <div
            id={idtype}
            className={"mt-1 memberBackground-" + boardmemberList[i].color}
          >
            {boardmemberList[i].memberName.charAt(0)}
          </div>
          <UncontrolledPopover
            trigger="legacy"
            placement="bottom"
            target={idtype}
          >
            <PopoverHeader>Manage Member</PopoverHeader>
            <PopoverBody>
              <button id={idtype} class="btn btn-danger" onClick={this.onKick}>
                Kick
              </button>
            </PopoverBody>
          </UncontrolledPopover>
        </div>
      );
    }
    return this.state.memberList;
  }
  componentWillMount() {
    if (this.props.stateFromStore.userData.Color == 0) {
      let c = this.randomBackground();
      this.state.str = "userBackground-" + c;
      const colorData = { color: c };
      this.props.updateUserColor(colorData);
    } else {
      this.state.str =
        "userBackground-" + this.props.stateFromStore.userData.Color;
    }
  }
  async screenShot() {
    let base64image;
    await html2canvas(document.body).then((canvas) => {
      let croppedCanvas = document.createElement("canvas");
      let croppedCanvasContext = croppedCanvas.getContext("2d");

      croppedCanvas.width = 1500;
      croppedCanvas.height = 800;

      croppedCanvasContext.drawImage(
        canvas,
        210,
        130,
        1500,
        800,
        0,
        0,
        1500,
        800
      );

      base64image = croppedCanvas.toDataURL("image/png");
      //REVIEW change b img
    });
    await this.props.changeBoardImgFn({
      boardId: this.props.board,
      img: base64image,
    });

    this.props.addRecentBoardDataFn({
      board: this.props.board,
    });
  }
  // REVIEW delete p
  deleteFrameHandler() {
    let boardIndex;
    for (let i = 0; i < this.props.stateFromStore.boardData.length; i++) {
      if (this.props.stateFromStore.boardData[i].id === this.props.board) {
        boardIndex = i;
        break;
      }
    }
    let pageLength = this.props.stateFromStore.cardData[boardIndex].data.length;
    if (this.props.stateFromStore.curPage === pageLength && pageLength > 1) {
      let newPage = this.props.stateFromStore.curPage - 1;
      this.pageChangeHandler(newPage);
      history.push(
        "/list/" +
          this.props.board +
          "/" +
          this.props.stateFromStore.cardData[boardIndex].data[newPage - 1].id
      );
    }
    if (pageLength > 1) {
      this.props.deletePageFn({
        boardId: this.props.board,
        pageId: this.props.page,
        page: this.props.stateFromStore.curPage,
      });
    } else {
      this.clearFrameHandler();
    }
  }
  //REVIEW clear frame
  clearFrameHandler() {
    this.props.clearFrameFn({
      boardId: this.props.board,
      pageId: this.props.page,
      page: this.props.stateFromStore.curPage,
    });
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div
        className="roboto"
        style={{ backgroundColor: "white", width: "100%" }}
      >
        <Container
          className="m-0 p-0"
          style={{ "max-width": "100%", width: "100%" }}
        >
          <Row className="justify-content-center m-0 w-100">
            {/* // REVIEW board name render */}
            <Col xs={4} style={{ fontSize: "35px" }}>
              {this.props.path != "list" ? (
                <input
                  type="text"
                  className="form-control board-name ml-4 mt-3 pl-0"
                  style={{ width: "100%" }}
                  maxlength="24"
                  onBlur={() => {
                    this.props.changeBoardNameFn({
                      boardId: this.props.board,
                      boardName: this.state.boardName,
                    });
                  }}
                  onChange={(e) =>
                    this.setState({
                      ...this.state,
                      boardName: e.target.value,
                    })
                  }
                  value={this.state.boardName}
                ></input>
              ) : (
                <div></div>
              )}
            </Col>
            <Col xs={4} className="text-center">
              <Link to="/list">
                <img
                  src={Logo}
                  width="60"
                  height="60"
                  alt="CoopBoard"
                  onClick={() => {
                    if (this.props.path != "list") {
                      this.screenShot();
                      this.pageChangeHandler(0);
                    }
                  }}
                />
              </Link>
            </Col>
            {/* REVIEW profile */}
            <Col xs={4} className="d-flex justify-content-end">
              <OverlayTrigger
                // trigger="focus"
                trigger="click"
                placement="bottom"
                overlay={
                  <Popover
                    id="popover-basic"
                    className="py-3 d-flex flex-column popover-dec text-center"
                  >
                    <div className="w-100 text-center d-flex flex-row justify-content-center">
                      <button
                        className="btn button-profile text-center p-0"
                        disable
                      >
                        {this.props.stateFromStore.user.displayName
                          .split(" ")[0]
                          .charAt(0)
                          .toUpperCase()}
                        {this.props.stateFromStore.user.displayName
                          .split(" ")[1]
                          .charAt(0)
                          .toUpperCase()}
                      </button>
                    </div>
                    <div className="display-name mb-1">
                      {this.props.stateFromStore.user.displayName}
                    </div>
                    <div className="hr px-2"></div>
                    <div className="w-100 mt-1 text-center d-flex flex-row justify-content-center">
                      <div
                        className="button-logout pt-1 mt-1"
                        onClick={() => {
                          this.props.userLogout();
                        }}
                      >
                        Sign Out
                      </div>
                    </div>
                  </Popover>
                }
              >
                <button className="btn button-user text-center p-0 mt-2 mr-2">
                  {this.props.stateFromStore.user.displayName
                    .split(" ")[0]
                    .charAt(0)
                    .toUpperCase()}
                  {this.props.stateFromStore.user.displayName
                    .split(" ")[1]
                    .charAt(0)
                    .toUpperCase()}
                </button>
              </OverlayTrigger>
            </Col>
          </Row>
          {this.props.path != "list" ? (
            <Row className="justify-content-center m-0 w-100 border-top">
              <Col xs={4}>
                <button
                  className="btn button-page mt-1 ml-3 btn-sm border-right"
                  style={{ fontSize: "16px" }}
                  onClick={this.deleteFrameHandler}
                >
                  Delete frame
                </button>
                <button
                  className="btn button-page mt-1 btn-sm"
                  style={{ fontSize: "16px" }}
                  onClick={this.clearFrameHandler}
                >
                  Clear frame
                </button>
              </Col>
              <Col
                xs={4}
                className="d-flex ot-1 flex-wrap flex-row justify-content-center"
              >
                <button
                  className="btn button-page mt-1 pt-0 btn-sm"
                  onClick={() =>
                    this.pageChangeHandler(
                      this.props.stateFromStore.curPage - 1
                    )
                  }
                  style={{ width: "50px", height: "32px", fontSize: "20px" }}
                >
                  &#60;
                </button>
                {/*NOTE page number render*/}
                <div
                  className="text-center mt-1 mb-1 border-right border-left btn-sm"
                  style={{ width: "70px", fontSize: "16px" }}
                >
                  {this.props.stateFromStore.curPage}
                </div>
                <button
                  className="btn button-page mt-1 pt-0 btn-sm"
                  onClick={() =>
                    this.pageChangeHandler(
                      this.props.stateFromStore.curPage + 1
                    )
                  }
                  style={{ width: "50px", height: "32px", fontSize: "20px" }}
                >
                  &#62;
                </button>
              </Col>
              <Col style={{ textAlign: "right" }}>
                <div className="d-flex flex-row">{this.renderMember()}</div>
              </Col>
              <Col style={{ textAlign: "right" }}>
                <button id="invite" className="invite-button">
                  +
                </button>
                <UncontrolledPopover
                  trigger="legacy"
                  placement="bottom"
                  target="invite"
                >
                  <PopoverHeader>Invite Member</PopoverHeader>
                  <PopoverBody>
                    <form>
                      <div className="form-group">
                        <label for="EmailInput">Send Invite to</label>
                        <input
                          type="text"
                          class="form-control"
                          id="Email"
                          name="Email"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                          onChange={this.onInputChange}
                        ></input>
                      </div>
                    </form>
                    <button
                      type="submit"
                      className="btn-primary"
                      onClick={this.onInviteSubmit}
                    >
                      Send Invite
                    </button>
                  </PopoverBody>
                </UncontrolledPopover>
              </Col>
            </Row>
          ) : (
            <div />
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateFromStore: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changePageFn: (data) => {
      return dispatch({ type: "CHANGE_PAGE", payload: data });
    },
    addPageFn: (data) => {
      return dispatch(action.addPage(data));
    },
    inviteMember: (newMember) => {
      return dispatch({ type: "INVITE_MEMBER", payload: newMember });
    },
    //REVIEW map dispatch img board
    changeBoardImgFn: (data) => {
      return dispatch(action.changeBoardImg(data));
    },
    addRecentBoardDataFn: (data) => {
      return dispatch({ type: "ADD_RECENT_BOARD", payload: data });
    },
    //REVIEW map dispatch del page
    deletePageFn: (data) => {
      return dispatch(action.deletePage(data));
    },
    //REVIEW map dispatch clear frame
    clearFrameFn: (data) => {
      return dispatch(action.clearFrame(data));
    },
    //REVIEW map dispatch clear frame
    changeBoardNameFn: (data) => {
      return dispatch(action.changeBoardName(data));
    },
    updateUserColor: (newColor) => {
      return dispatch({ type: "CHANGE_USER_COLOR", payload: newColor });
    },
    kickMember: (newMember) => {
      return dispatch({ type: "KICK_MEMBER", payload: newMember });
    },
    userLogout: () => dispatch(action.userLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
