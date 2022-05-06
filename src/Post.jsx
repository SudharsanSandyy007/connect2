import { Bookmark, Comment, Send, Share, ThumbUp } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import "./Post.css";
import { useStateValue } from "./StateProvider";
function Post({
  profilePic,
  displayName,
  postid,
  postImgUrl,
  postMsg,
  timestamp,
  likes,
}) {
  const [{ user }, dispatch] = useStateValue();
  const [likeCount, setlikeCount] = useState(0);

  const addtobookmarks = (e) => {
    const collref = collection(db, "bookmarks");
    addDoc(collref, {
      postid: postid,
    })
      .then(() => {
        e.target.style.color = "blue";
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const addOrRemoveLikes = (e) => {
    let tempArr = [];
    e.target.style.color = "blue";
    const docRef = doc(db, "posts", postid);
    getDoc(docRef).then((snapshot) => {
      tempArr = snapshot.data().likes;

      if (tempArr.indexOf(user.email) !== -1) {
      } else {
        tempArr.push(user.email);
      }

      updateDoc(docRef, {
        likes: tempArr,
      });
    });
  };
  return (
    <div className="post">
      <div className="post__top">
        <div className="postTop__left">
          <Avatar src={profilePic} />
        </div>
        <div className="postTop__right">
          <h2>{displayName}</h2>
          <p>{new Date(timestamp?.toDate()).toString()}</p>
        </div>
      </div>
      <div className="post__middle">
        <p>{postMsg}</p>
        <img className="postMiddle__postImg" src={postImgUrl} alt="" />
      </div>
      <div className="post__bottom">
        <div className="post__bottom__option">
          <ThumbUp onClick={addOrRemoveLikes} /> <p>Like</p>
        </div>
        {/* <div className="post__bottom__option">
          <Comment /> <p>Comment</p>
        </div>
        <div className="post__bottom__option">
          <Share /> <p>Share</p>
        </div> */}
        <div className="post__bottom__option" onClick={addtobookmarks}>
          <Bookmark /> <p>Save</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
