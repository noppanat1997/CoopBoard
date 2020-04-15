import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Logo from '.././images/logo.svg';
import '.././css/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.togglePresent = this.togglePresent.bind(this);
    this.inviteMember = this.inviteMember.bind(this);
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
    console.log("render!")
    for (let i = this.memberList.length + 1; i < memberCount; i++) {
      this.memberList.push(<div className={"member" + this.randomBackground()}>{i}</div>);
    }
    return this.memberList
  }
  componentWillUpdate() {

  }
  componentWillMount() {
    this.str = "user" + this.randomBackground()
  }
  render() {
    return (
      <div className="bg-light" >
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
              <div className={"ml-5 mt-1 " + this.str}>
                <div className="pt-2">
                  {(this.props.stateFromStore.userData.Name.charAt(0) + this.props.stateFromStore.userData.Surname.charAt(0))}
                </div>
              </div>
            </Col>
          </Row>
          {this.props.path != "list" ?
            <Row className="justify-content-center m-0 w-100 border-top">
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
    increaseMember: (newMember) => {
      return dispatch({ type: 'INVITE_MEMBER', payload: newMember });
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