import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatSideBar from "./ChatSideBar";

function Chat() {
  return (
    <div className="chat">
      <ChatSideBar />
    </div>
  );
}

export default Chat;
