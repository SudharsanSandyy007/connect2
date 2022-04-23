import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import "./ConnectPay.css";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";

function ConnectPay() {
  const [{ user }] = useStateValue();
  const [email, setemail] = useState("");
  const [amount, setamount] = useState("");
  const [walletId, setwalletId] = useState("");
  const [prevWalletAmt, setprevWalletAmt] = useState("");

  const makepayment = (e) => {
    e.preventDefault();

    const colref = collection(db, "wallet");
    const q = query(colref, where("owner", "==", user.email));

    onSnapshot(q, (snapshot) => {
      let temp;
      snapshot.docs.forEach((doc) => {
        temp = doc.data().amount;
        setwalletId(doc.id);
      });
      setprevWalletAmt(temp);
    });

    alert(walletId);
    const amt = Number(amount) + Number(prevWalletAmt);

    //RAZORPAY---------

    var options = {
      key: "rzp_live_LfeNAcLrs4ckTi",
      key_secret: "ZSROC5s5brlAae1amnbnG4Ol",
      amount: amount * 100,
      currency: "INR",
      name: "CONNECT TECHNOLOGIEZ",
      description: "SENDING AMOUNT TO : " + `${email}` + "CONNECT | PAY",
      handler: function (response) {
        alert(response.razorpay_payment_id);

        if (amt < 0) {
          alert("Amount should be greater than 0.");
        } else {
          const docref = doc(db, "wallet", walletId);
          updateDoc(docref, {
            amount: amt,
          })
            .then(alert("WALLET UPDATED"))
            .catch((e) => {
              console.log(e.message);
            });
        }
      },
      prefill: {
        name: user.displayName,
        email: user.email,
        contact: user.phonenumber,
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

    //----------
  };

  return (
    <div className="connectpay">
      <div className="connectpay__container">
        <h1>CONNECT PAYMENTS</h1>
        <p className="connectPay__description">
          Transfer amount to connect user's wallet within the app!
        </p>
        <form action="">
          <div className="connect__pay__form__option">
            <label htmlFor="email">Email: </label>
            <br />
            <input
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              autoComplete="off"
              type="text"
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div className="connect__pay__form__option">
            <label htmlFor="amount">Amount: </label>
            <br />
            <input
              value={amount}
              onChange={(e) => {
                setamount(e.target.value);
              }}
              autoComplete="off"
              type="number"
              id="amount"
              placeholder="Enter amount in ₹"
            />
          </div>
          <div className="connect__pay__form__option">
            <button
              onClick={makepayment}
              className="connectPayForm__payBtn"
              type="submit"
            >
              PAY ₹{amount}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConnectPay;
