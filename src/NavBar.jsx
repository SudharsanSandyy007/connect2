import {
  AccountBoxRounded,
  AccountCircle,
  Chat,
  ChatBubble,
  CoronavirusRounded,
  Group,
  Home,
  SentimentSatisfiedAlt,
  Storefront,
  StorefrontRounded,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { signOut } from "firebase/auth";

import React from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import "./Navbar.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function NavBar() {
  const [{ user }, dispatch] = useStateValue();

  const logout = () => {
    signOut(auth)
      .then(() =>
        dispatch({
          user: null,
          type: actionTypes.SET_USER,
        })
      )
      .catch((e) => console.log(e));
  };
  return (
    <div className="navbar">
      <div className="navbar__left">
        <div className="navbarLeft__logo">
          CONNECT
          <SentimentSatisfiedAlt />
        </div>
      </div>

      <div className="navbar__middle">
        <Link to="/">
          <div className="navbarMiddle__option">
            <Home />
          </div>
        </Link>
        <Link to="/stores">
          <div className="navbarMiddle__option">
            <Storefront />
          </div>
        </Link>
        <Link to="/groupchat/">
          <div className="navbarMiddle__option">
            <Group />
          </div>
        </Link>
        <Link to="/chat">
          <div className="navbarMiddle__option">
            <Chat />
          </div>
        </Link>
      </div>

      <div className="navbar__right">
        <div className="navbarRight__option" onClick={logout}>
          <Avatar src={user.photoURL} />
          <h2>{user.displayName}</h2>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
