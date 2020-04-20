import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Logo from '.././images/logo.svg';
import '.././css/Header.css';
import {UncontrolledPopover, PopoverHeader, PopoverBody} from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.togglePresent = this.togglePresent.bind(this);
  }
  state = {
    Email : ''
  }
  str = ""
  memberList = []
  onInputChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  onInviteSubmit = (event) => {
    console.log(this.state)
    const payloadData = {
      memberData : this.state.Email,
      boardId : this.props.board,
      color : this.randomBackground()
    }
    this.props.inviteMember(payloadData)
  }
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
      case 0: return 1;
      case 1: return 2;
      case 2: return 3;
      case 3: return 4;
    }
  }
  onKick = (e) => {
    let i = parseInt(e.target.id.charAt(6));
    const payloadData = {
      boardId : this.props.board,
      memberId : i
    }
    this.props.kickMember(payloadData);
  }
  renderMember() {
    let boardmemberList = this.props.stateFromStore.memberData[this.props.board-1].member;
    this.memberList = [];
    for (let i = 0; i < boardmemberList.length; i++) {
      let idtype = "member" + i
      this.memberList.push(<div>
        <div id={idtype} className={"mt-1 memberBackground-" + boardmemberList[i].color}>
        {boardmemberList[i].memberName.charAt(0)}</div>
        <UncontrolledPopover trigger="legacy" placement="bottom" target={idtype}>
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
    return this.memberList
  }
  componentWillMount() {
    if(this.props.stateFromStore.userData.Color == 0){
      let c = this.randomBackground()
      this.str = "userBackground-" + c
      const colorData = { color: c }
      this.props.updateUserColor(colorData);
    }
    else{
      this.str = "userBackground-" + this.props.stateFromStore.userData.Color
    }
  }
  render() {
    return (
      <div className="roboto" style={{ backgroundColor: 'white' }}>
        <Container className="m-0 p-0" style={{ "max-width": "100%", "width": "100%" }}>
          <Row className="justify-content-center m-0 w-100">
            <Col xs={4} />
            <Col xs={4} className="text-center">
              <Link to='/list'>
                <img
                  src={Logo}
                  width="60"
                  height="60"
                  alt="CoopBoard"
                />
              </Link>
            </Col>
            <Col style={{ textAlign: 'right' }}></Col>
            <Col>
              <div id="profile" className={"ml-5 mt-1 " + this.str}>
                <div className="pt-2">
                  {(this.props.stateFromStore.userData.Name.charAt(0) + this.props.stateFromStore.userData.Surname.charAt(0))}
                </div>
              </div>
              <UncontrolledPopover trigger="legacy" placement="bottom" target="profile">
                <PopoverHeader>Profile</PopoverHeader>
                <PopoverBody>
                  <div>
                    <button class="btn btn-danger">
                      Logout
                    </button>
                  </div>
                </PopoverBody>
              </UncontrolledPopover>
            </Col>
          </Row>
          {this.props.path != "list" ?
            <Row className="justify-content-center m-0 w-100 border-top">
              <Col xs={4} />
              <Col xs={4} className="d-flex ot-1 flex-wrap flex-row justify-content-center">
                <button
                  className="btn button-page mt-1 pt-0 btn-sm"
                  onClick={() => this.pageChangeHandler(this.props.curPage - 1)}
                  style={{ "width": "50px", height: '32px', fontSize: '20px' }}
                >&#60;</button>
                <div
                  className="text-center mt-1 mb-1 border-right border-left btn-sm"
                  style={{ "width": "70px", fontSize: '16px' }}
                >{this.props.curPage}</div>
                <button
                  className="btn button-page mt-1 pt-0 btn-sm"
                  onClick={() => this.pageChangeHandler(this.props.curPage + 1)}
                  style={{ "width": "50px", height: '32px', fontSize: '20px' }}
                >&#62;</button>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <div className="d-flex flex-row">
                  {this.renderMember()}
                </div>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <button id="invite" className="invite-button">
                  +
                </button>
                <UncontrolledPopover trigger="legacy" placement="bottom" target="invite">
                <PopoverHeader>Invite Member</PopoverHeader>
                <PopoverBody>
                  <form>
                    <div className="form-group">
                      <label for="EmailInput">Send Invite to</label>
                      <input type="text" class="form-control" id="Email" name="Email" aria-describedby="emailHelp" placeholder="Enter email"
                      onChange={this.onInputChange}></input>
                    </div>
                  </form>
                  <button type="submit" className="btn-primary" onClick={this.onInviteSubmit}>
                    Send Invite
                  </button>
                </PopoverBody>
              </UncontrolledPopover>
                <button className={"mt-1 ml-1 " + (this.props.stateFromStore.isPresent ? "btn-danger" : "btn-primary")}
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
    stateFromStore: state,
    curPage: state.curPage
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
    inviteMember: (newMember) => {
      return dispatch({ type: 'INVITE_MEMBER', payload: newMember });
    },
    updateUserColor: (newColor) => {
      return dispatch({ type: 'CHANGE_USER_COLOR', payload: newColor});
    },
    kickMember: (newMember) => {
      return dispatch({ type: 'KICK_MEMBER', payload: newMember});
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

/*<Row className="justify-content-center m-0 w-100 border-top">
            <Col xs={4} />
            <Col xs={4} className="text-center">
              <button
                className="btn btn-light mt-1 mb-1 btn-sm"
                onClick={() => this.pageChangeHandler(this.props.curPage - 1)}
                style={{ "width": "50px" }}
              >&#60;</button>
              <button className="btn btn-light mt-1 mb-1 border-right border-left btn-sm" style={{ "width": "70px" }}>{this.props.curPage}</button>
              <button
                className="btn btn-light mt-1 mb-1 btn-sm"
                onClick={() => this.pageChangeHandler(this.props.curPage + 1)}
                style={{ "width": "50px" }}
              >&#62;</button>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <div className="d-flex flex-row">
                {this.renderMember()}
              </div>
              <button type="button" class="pl-1 mt-1 btn btn-info btn-circle" onClick={this.inviteMember}>
                +
              </button>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <button className={"mt-1 " + (this.props.stateFromStore.isPresent ? "ispresent-true" : "ispresent-false")}
                onClick={this.togglePresent}>
                {this.props.stateFromStore.isPresent ? "Stop Presentation" : "Start Presentation"}
              </button>
            </Col>
          </Row>*/