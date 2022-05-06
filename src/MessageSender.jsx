import {
  AddPhotoAlternate,
  CameraAltRounded,
  LocationDisabled,
  LocationOnRounded,
  SentimentSatisfied,
  VideoCameraBack,
  VideoCameraFrontRounded,
  VideocamRounded,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "./firebase";
import "./MessageSender.css";
import { useStateValue } from "./StateProvider";

function MessageSender() {
  const [{ user }, dispatch] = useStateValue();
  const [postImgUrl, setpostImgUrl] = useState("");
  const [postMsg, setpostMsg] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const collref = collection(db, "posts");
    addDoc(collref, {
      displayName: user.displayName,
      profilepic: user.photoURL,
      postImgUrl: postImgUrl,
      postMsg: postMsg,
      timestamp: serverTimestamp(),
      likes: [],
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        alert(err.message);
      });
    setpostImgUrl("");
    setpostMsg("");
  };

  return (
    <div className="messagesender">
      <div className="messagesender__addPostContainer__top">
        <form action="" onSubmit={handlePostSubmit}>
          <Avatar src={user.photoURL} />

          <input
            type="text"
            className="messagesender__postImgUrl"
            placeholder="Add Post"
            value={postImgUrl}
            onChange={(e) => {
              setpostImgUrl(e.target.value);
            }}
          />
          <input
            type="text"
            className="messagesender__postMsg"
            placeholder="Write something..."
            value={postMsg}
            onChange={(e) => {
              setpostMsg(e.target.value);
            }}
          />

          <input type="submit" style={{ display: "none" }} />
        </form>
      </div>
      {/* <div className="messagesender__addPostContainer__bottom">
        <div className="messagesenderAddPostContainerBottom__option">
          <CameraAltRounded style={{ color: "green" }} /> <p>Add Photos</p>
        </div>
        <div className="messagesenderAddPostContainerBottom__option">
          <VideocamRounded style={{ color: "red" }} /> <p>Videos</p>
        </div>
        <div className="messagesenderAddPostContainerBottom__option">
          <SentimentSatisfied style={{ color: "yellow" }} />{" "}
          <p>Feeling/Activity</p>
        </div>
      </div> */}
    </div>
  );
}

export default MessageSender;
