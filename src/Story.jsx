import { AddRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import "./Story.css";
function Story(props) {
  const [{ user }, dispatch] = useStateValue();

  const handleAddStory = (e) => {
    const storyUrl = prompt("Enter Story URL: ");
    if (storyUrl.length != 0) {
      const colref = collection(db, "story");
      addDoc(colref, {
        email: user.email,
        displayName: user.displayName,
        profilePic: user.photoURL,
        storyImg: storyUrl,
        timestamp: serverTimestamp(),
      });
    } else {
      alert("URL you entered is empty!");
    }
  };
  return (
    <div
      className="story"
      style={{
        backgroundImage: `url("${props.storyImg}")`,
        backgroundSize: "cover",
      }}
    >
      {props.addStory ? (
        <>
          <Avatar className="profilepic" src={user.photoURL} />
          <div className="addstory" onClick={handleAddStory}>
            <AddRounded />
            <p>ADD STORY</p>
          </div>
        </>
      ) : (
        <>
          <Avatar className="profilepic" src={props.profilePic} />
          <h3 className="story__displayName">{props.displayName}</h3>
        </>
      )}
    </div>
  );
}

export default Story;
