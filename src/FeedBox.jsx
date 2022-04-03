import React, { useEffect, useState } from "react";
import Story from "./Story";
import "./FeedBox.css";
import { Avatar } from "@mui/material";
import {
  AddPhotoAlternate,
  AddToPhotos,
  Album,
  PhotoAlbum,
  PhotoAlbumOutlined,
} from "@mui/icons-material";
import MessageSender from "./MessageSender";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

function FeedBox() {
  const [posts, setposts] = useState([]);
  const [stories, setstories] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    onSnapshot(q, (snapshot) => {
      let tempPosts = [];
      snapshot.docs.forEach((doc) => {
        tempPosts.push({ ...doc.data(), id: doc.id });
      });
      setposts(tempPosts);
    });

    const story_q = query(
      collection(db, "story"),
      orderBy("timestamp", "desc")
    );

    onSnapshot(story_q, (snapshot) => {
      let tempStories = [];
      snapshot.docs.forEach((doc) => {
        tempStories.push({ ...doc.data(), id: doc.id });
      });
      setstories(tempStories);
    });
  }, []);
  console.log(posts);
  console.log("STORIES>>>>", stories);
  return (
    <div className="feedbox">
      <div className="feedbox__storyContainer">
        <Story addStory={true} />
        {stories.map((story) => (
          <Story
            key={story.id}
            displayName={story.displayName}
            email={story.email}
            profilePic={story.profilePic}
            storyImg={story.storyImg}
            timestamp={story.timestamp}
          />
        ))}
      </div>
      <div className="feedbox__addPostContainer">
        <MessageSender />
      </div>
      <div className="feedbox__newsfeeds">
        {posts.map((post) => (
          <Post
            key={post.id}
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

export default FeedBox;
