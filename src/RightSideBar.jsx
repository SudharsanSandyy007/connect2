import { AddCircle } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase";
import "./RightSideBar.css";
import { useStateValue } from "./StateProvider";

function RightSideBar() {
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
        tempUsersList.push({ ...doc.data() });
      });
      setusersList(tempUsersList);
    });
  }, []);

  return (
    <div className="rightsidebar">
      <h1 className="rightsidebar__cht">C H A T S</h1>
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

export default RightSideBar;
