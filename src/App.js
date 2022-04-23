import { AddCircle } from "@mui/icons-material";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddConnectStore from "./AddConnectStore";
import "./App.css";
import BookmarkedPosts from "./BookmarkedPosts";
import Chat from "./Chat";
import ChatSideBar from "./ChatSideBar";
import ChatWindow from "./ChatWindow";
import ConnectPay from "./ConnectPay";
import FeedBox from "./FeedBox";
import { db } from "./firebase";
import GroupChatsSideBar from "./GroupChatsSideBar";
import GroupChatWindow from "./GroupChatWindow";
import Login from "./Login";
import NavBar from "./NavBar";
import RightSideBar from "./RightSideBar";
import ShopsContainer from "./ShopsContainer";
import SideBar from "./SideBar";
import { useStateValue } from "./StateProvider";
import StoreShowCase from "./StoreShowCase";
import Wallet from "./Wallet";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {user ? (
        <>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <div className="app__body">
                  <SideBar />
                  <FeedBox />
                  <RightSideBar />
                </div>
              }
            />
            <Route
              path="/chat"
              element={
                <div className="personalchats">
                  <ChatSideBar />
                  <ChatWindow />
                </div>
              }
            />

            <Route
              path="/chat/:roomId"
              element={
                <div className="personalchats">
                  <ChatSideBar />
                  <ChatWindow />
                </div>
              }
            />

            <Route
              path="/groupchat/"
              element={
                <div className="groupchats">
                  <GroupChatsSideBar />
                  <GroupChatWindow />
                </div>
              }
            />
            <Route
              path="/groupchat/:roomId"
              element={
                <div className="groupchats">
                  <GroupChatsSideBar />
                  <GroupChatWindow />
                </div>
              }
            />
            <Route
              path="/stores"
              element={
                <div className="connect__stores">
                  <Link to={"/addconnectstore"}>
                    <div className="addConnectStores">
                      <AddCircle /> ADD YOUR OWN CONNECT STORE
                    </div>
                  </Link>
                  <ShopsContainer />
                </div>
              }
            />
            <Route
              path="/bookmarkedposts/"
              element={
                <div className="app__body">
                  <SideBar />
                  <BookmarkedPosts />
                  <RightSideBar />
                </div>
              }
            />
            <Route
              path="/connectpay"
              element={
                <div className="app__body">
                  <SideBar />
                  <ConnectPay />
                  <RightSideBar />
                </div>
              }
            />
            <Route
              path="/wallet"
              element={
                <div className="app__body">
                  <SideBar />
                  <Wallet />
                  <RightSideBar />
                </div>
              }
            />
            <Route
              path="/addconnectstore"
              element={
                <div className="app__body">
                  <AddConnectStore />
                </div>
              }
            />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
