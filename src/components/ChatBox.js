import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { connect } from "react-redux";
import Messages from "./chat/Messages";
import InfoBar from "./chat/InfoBar";
import Input from "./chat/Input";

import { MdChatBubble } from "react-icons/md";
import "../css/chat/Chat.css";
import { db, fire } from "../realtime";
let socket;

const ChatBox = (props) => {
  let boardIndex;
  for (let i = 0; i < props.stateFromStore.boardData.length; i++) {
    if (props.stateFromStore.boardData[i].id === props.board) {
      boardIndex = i;
      break;
    }
  }

  // fire.auth().onAuthStateChanged(function(user) {
  //   console.log('OOOOOOOOOOOOOOO',user.uid)
  //   if (user != null) {
  //     fetchData(user.uid);
  //   }else{
  //     history.push("/login");
  //   }
  // });
  //FIXME

  const [name, setName] = useState(props.stateFromStore.user.displayName);
  //FIXME boardname
  const [room, setRoom] = useState("A");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [state, setState] = useState({
    isShow: false,
  });
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    // const roomToSend = props.stateFromStore.boardData[boardIndex].id
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const toggleHandler = () => {
    setState({
      ...state,
      isShow: !state.isShow,
    });
  };

  return (
    // <div className="outerContainer">
    <div
      className={!state.isShow ? "my-chat-window" : "my-chat-window-active"}
      style={{ position: "absolute", zIndex: "8" }}
    >
      {state.isShow ? (
        <div className="my-container">
          <InfoBar
            room={props.stateFromStore.boardData[boardIndex].name}
            users={users}
          />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      ) : null}
      {/* <TextContainer users={users}/> */}
      <div
        className={!state.isShow ? "my-button" : "my-button-active"}
        onClick={toggleHandler}
      >
        <MdChatBubble />
      </div>
    </div>
    // </div>
  );
};
const mapStateToProps = (state) => {
  return {
    stateFromStore: state,
  };
};
export default connect(mapStateToProps, null)(ChatBox);
