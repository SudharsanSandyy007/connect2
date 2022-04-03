import { AccountCircleRounded } from "@mui/icons-material";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ChatWindow.css";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";

function ChatWindow() {
  const { roomId } = useParams();
  const [msgs, setmsgs] = useState([]);
  const [msgTxt, setmsgTxt] = useState("");
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

    let msgz = [];
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().sentby == roomId || doc.data().receivedby == roomId) {
          console.log(doc.data());
          msgz.push({ ...doc.data(), id: doc.id });
        }
      });
      setmsgs(msgz);
      msgz = [];
    });
  }, [roomId]);

  const sendMsg = (e) => {
    e.preventDefault();

    const collref = collection(db, "messages");
    addDoc(collref, {
      msg: msgTxt,
      sentby: user.email,
      receivedby: roomId,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        setmsgTxt("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="chat">
      <div className="chat__top">
        <div className="chatTop__info">
          <AccountCircleRounded className="avatar" />
          <h1>{roomId}</h1>
        </div>
      </div>
      <div className="chatMiddle">
        {console.log(msgs)}
        {msgs.map((m) => (
          <>
            {m.sentby == user.email && (
              <p
                key={m.id}
                className="chat__sent"
                style={{ color: "green", fontWeight: "600" }}
              >
                {" "}
                {m.msg}
                {
                  <span className="chatmsg__timestamp">
                    {new Date(m.timestamp?.toDate()).toUTCString()}
                  </span>
                }
              </p>
            )}

            {m.sentby != user.email && (
              <p
                key={m.id}
                className="chat__received"
                style={{ color: "red", fontWeight: "600" }}
              >
                {" "}
                {m.msg}
                <span className="chatmsg__timestamp">
                  {new Date(m.timestamp?.toDate()).toUTCString()}
                </span>
              </p>
            )}
          </>
        ))}
      </div>

      <div className="chatBottom">
        <form action="" onSubmit={sendMsg}>
          <input
            className="sendMsg"
            value={msgTxt}
            placeholder="Type something..."
            onChange={(e) => {
              setmsgTxt(e.target.value);
            }}
            type="text"
          />
          <input type="submit" className="chatBottom__snd" value="send" />
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;
