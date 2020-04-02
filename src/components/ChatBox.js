import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import '.././css/BoardPages.css';
import 'react-chat-widget/lib/styles.css';

// import logo from './logo.svg';

class ChatBox extends Component {
  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
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
export default ChatBox