import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "./BookmarkedPosts.css";
import { db } from "./firebase";
import Post from "./Post";
function BookmarkedPosts() {
  const [bkmarks, setbkmarks] = useState([]);
  useEffect(() => {
    let tempArr = [];
    const collref = collection(db, "bookmarks");
    let tempbkarr = [];

    getDocs(collref).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        tempArr.push({ ...doc.data() });
      });
      console.log(tempArr);

      tempArr.forEach((arr) => {
        const docref = doc(db, "posts", arr.postid);
        getDoc(docref).then((doc) => {
          tempbkarr.push({ ...doc.data(), bkid: doc.id });
          setbkmarks(tempbkarr);
        });
      });
    });
  }, []);
  console.log(bkmarks);
  return (
    <div className="bookmarkedposts">
      <h1>BOOKMARKS</h1>
      <div className="bookmarkedposts__feed">
        {bkmarks.map((post) => (
          <Post
            key={post.bkid}
            profilePic={post.profilePic}
            displayName={post.displayName}
            postid={post.id}
            postImgUrl={post.postImgUrl}
            postMsg={post.postMsg}
            timestamp={post.timestamp}
          />
        ))}
      </div>
    </div>
  );
}

export default BookmarkedPosts;
