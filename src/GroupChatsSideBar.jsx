import React, { useEffect, useState } from "react";
import "./GroupChatsSideBar.css";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
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

function GroupChatsSideBar() {
  const [{ user }, dispatch] = useStateValue();

  const [groupList, setgroupList] = useState([]);

  useEffect(() => {
    const collref = collection(db, "groups");

    onSnapshot(collref, (snapshot) => {
      let tempGropList = [];
      snapshot.docs.forEach((doc) => {
        tempGropList.push(doc.data().groupname);
        function removeDuplicates(arr) {
          return [...new Set(arr)];
        }

        tempGropList = removeDuplicates(tempGropList);
        setgroupList(tempGropList);
      });
    });
  }, []);

  const addnewgroup = (e) => {
    e.preventDefault();
    const grpname = prompt("Enter Group Name: ", "Test Group!");
    if (grpname.length != 0) {
      const collref = collection(db, "groups");
      addDoc(collref, {
        groupname: grpname,
        msg: "",
        sentby: user.email,
        timestamp: serverTimestamp(),
      })
        .then(() => {})
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("GROUP NAME you entered is empty!");
    }
  };

  console.log(groupList);
  return (
    <div className="sidebar">
      <div onClick={addnewgroup} className="sidebar__chatBar">
        <AddCircle /> &nbsp; ADD NEW GROUP
      </div>
      {groupList.map((room) => (
        <Link key={room} to={`/groupchat/${room}`}>
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

export default GroupChatsSideBar;
