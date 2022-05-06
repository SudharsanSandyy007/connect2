import {
  Accessibility,
  AccessibilityNew,
  Accessible,
  AccountBalanceWalletOutlined,
  AccountBalanceWalletRounded,
  Bookmark,
  BookmarkAdded,
  CalendarMonthRounded,
  ConnectedTv,
  Coronavirus,
  CurrencyRupee,
  Group,
  Handshake,
  HandshakeOutlined,
  HandshakeSharp,
  Help,
  Home,
  Payment,
  Settings,
  Storefront,
  StorefrontRounded,
} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

function SideBar() {
  const makePayment = (e) => {
    e.preventDefault();

    var options = {
      key: "rzp_test_KJIRu7kUHgB9iH",
      key_secret: "nmTV9B8YUvRzjWkhj73xpeWs",
      amount: 100,
      currency: "INR",
      name: "RENT A HOUSE",
      description: "DEPOSIT AMOUNT: " + `AMOUT FOR WAT`,
      handler: function (response) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: "user.displayName",
        email: "user.email",
        contact: "user.phonenumber",
      },
      notes: {
        address: "Razorpay corporate office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div className="sidebar">
      <Link to="/">
        <div className="sidebar__option">
          <Home style={{ color: "#ff0066" }} /> <b>Home</b>
        </div>
      </Link>
      <Link to={`/groupchat/`}>
        <div className="sidebar__option">
          <Group style={{ color: "#ad33ff" }} /> <b>Groups</b>
        </div>
      </Link>

      <Link to="/bookmarkedposts">
        <div className="sidebar__option">
          <BookmarkAdded style={{ color: "#33cc33" }} /> <b>Bookmarked/Saved</b>
        </div>
      </Link>
      <Link to={"/connectpay"}>
        <div className="sidebar__option">
          <Payment style={{ color: "#003366" }} /> <b>Connect Pay</b>
        </div>
      </Link>
      <Link to={"/wallet"}>
        <div className="sidebar__option">
          <AccountBalanceWalletOutlined style={{ color: "#ffa200" }} />{" "}
          <b>Wallet</b>
        </div>
      </Link>
      {/* <div className="sidebar__option">
        <CalendarMonthRounded style={{ color: "#1affff" }} /> <b>Events</b>
      </div> */}
      <a target={`_blank`} href={`https://rzp.io/l/ijyBVXee`}>
        <div className="sidebar__option">
          <AccessibilityNew style={{ color: "#000000" }} /> <b>Help people</b>
        </div>
      </a>
      <Link to="/stores">
        <div className="sidebar__option">
          <Storefront style={{ color: "#0044ff" }} /> <b>Connect Shops</b>
        </div>
      </Link>
      {/* <div className="sidebar__option">
        <Coronavirus style={{ color: "#00ff99" }} /> <b>Covid Tracker</b>
      </div>
      <div className="sidebar__option">
        <Settings style={{ color: "#737373" }} /> <b>Settings</b>
      </div> */}
    </div>
  );
}

export default SideBar;
