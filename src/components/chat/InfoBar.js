import React from "react";

import onlineIcon from "./onlineIcon.png";
import closeIcon from "./closeIcon.png";

import "../.././css/chat/InfoBar.css";

const InfoBar = ({ room, users }) => {
  let list;
  if (users.length !== 0) {
    list = users.map((item) => (
      <div className="name-box px-1 bg-light mr-1" key={item.id}>
        {/* {item.name.split(" ")[0].charAt(0).toUpperCase()}
        {item.name.split(" ")[1].charAt(0).toUpperCase()} */}
        A
      </div>
    ));
  }
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <div className="container">
          <div className="row mb-0">
            <h3 className="mb-0">{room}</h3>
          </div>
          <div className="row mt-1">
            {/* <div className="onlineIcon mt-2"></div> */}
            {list}
          </div>
        </div>
      </div>
      {/* <div className="rightInnerContainer">
        <a href="/">
          <img src={closeIcon} alt="close icon" />
        </a>
      </div> */}
    </div>
  );
};

export default InfoBar;
