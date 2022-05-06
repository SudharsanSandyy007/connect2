import {
  addDoc,
  collection,
  doc,
  getDocs,
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
    let amt1;
    let tempdocid;

    //RAZORPAY---------

    var options = {
      key: "rzp_test_RjCr3K2nZDtpjM",
      key_secret: "WDPHdHnASUr2lRZ4QnEkF46W",
      amount: amount * 100,
      currency: "INR",
      name: "CONNECT TECHNOLOGIEZ",
      description: "SENDING AMOUNT TO : " + `${email}` + "CONNECT | PAY",
      handler: function (response) {
        alert(response.razorpay_payment_id);

        if (amt1 < 0) {
          alert("Amount should be greater than 0.");
        } else {
          const wallets = query(
            collection(db, "wallet"),
            where("owner", "==", email)
          );
          getDocs(wallets).then((snapshot) => {
            snapshot.forEach((documnt) => {
              amt1 = Number(documnt.data().amount) + Number(amount);
              const docRef = doc(db, "wallet", documnt.id);
              updateDoc(docRef, {
                amount: amt1,
              });
            });
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
