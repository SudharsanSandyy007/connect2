import React, { useEffect, useState } from "react";
import "./ChatSideBar.css";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  AccountCircle,
  AccountCircleRounded,
  AddCircle,
  HdrPlusRounded,
  PlusOne,
} from "@mui/icons-material";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import { Avatar } from "@mui/material";

function ChatSideBar() {
  const [roomsInfo, setroomsInfo] = useState([]);
  const [usersList, setusersList] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const collref = collection(db, "messages");
    let chatHeads = [];
    let name = "";

    onSnapshot(collref, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (
          doc.data().sentby == user.email ||
          doc.data().receivedby == user.email
        ) {
          if (doc.data().sentby != user.email) {
            name = doc.data().sentby;
          } else if (doc.data().receivedby != user.email) {
            name = doc.data().receivedby;
          } else {
            name = "";
          }
          console.log(name);
          chatHeads.push(name);

          function removeDuplicates(arr) {
            return [...new Set(arr)];
          }

          chatHeads = removeDuplicates(chatHeads);
        }
      });
      console.log(chatHeads);
      setroomsInfo(chatHeads);
    });

    const usersRef = collection(db, "users");
    getDocs(usersRef).then((snapshot) => {
      let tempUsersList = [];
      snapshot.docs.forEach((doc) => {
        if (doc.data().email != user.email) {
          tempUsersList.push({ ...doc.data() });
        }
      });
      setusersList(tempUsersList);
    });
  }, []);

  const addNewChat = (e) => {
    e.preventDefault();
    const to = e.target.value;
    alert(to);
    const collref = collection(db, "messages");
    addDoc(collref, {
      msg: "",
      sentby: user.email,
      receivedby: to,
    })
      .then(() => {})
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="sidebar">
      <div onChange={addNewChat} className="sidebar__chatBar">
        <AddCircle />

        <select className="chatSideBar__startNewChat">
          <option value="">START NEW CHAT</option>

          {usersList.map((u) => (
            <option value={u.email}>{u.email}</option>
          ))}
        </select>
      </div>
      {roomsInfo.map((room) => (
        <Link key={room} to={`/chat/${room}`}>
          <div className="sidebar__chatBar">
            <Avatar className="avatar" />
            &nbsp;
            <b className="sidebarChatBar__toemail">{room}</b>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChatSideBar;
