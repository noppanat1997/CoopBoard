import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import '.././css/BoardPages.css';
import 'react-chat-widget/lib/styles.css';
import { connect } from 'react-redux'

// import logo from './logo.svg';

class ChatBox extends Component {

  constructor(props){
    super(props);

    this.state = {
      resMsg: [],
      userMsg: []
    }
  }

  componentDidMount() {
    this.state.resMsg = this.props.stateFromStore.msgData[1].msg
    for(let i = 0; i < this.state.resMsg.length; i++){
      addResponseMessage(this.state.resMsg[i])
    }
    addResponseMessage("Welcome to this awesome chat!");
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    let tmpMsgData
    this.props.AddMsgFn(2, newMessage)
    // Now send the message throught the backend API
  }

  render() {
    return (
      <div className="chat-box">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title="CoopBoard"
          subtitle=""
          titleAvatar="https://cdn.marketingoops.com/wp-content/uploads/2013/08/grumpycat1.jpg"
          profileAvatar="https://cdn.marketingoops.com/wp-content/uploads/2013/08/grumpycat1.jpg"
        />
      </div>
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
    AddMsgFn: (data) => {
      return dispatch({ type: 'ADD_MSG', payload: data });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);


