import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import "./StoreShowCase.css";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import emailjs from "emailjs-com";

function StoreShowCase({
  shopid,
  shopname,
  shopdescription,
  profileURL,
  products,
  shopowner,
}) {
  const [{ user }, dispatch] = useStateValue();

  const makepayment = (pprice, pname, pid) => {
    //RAZORPAY---------
    var options = {
      key: "rzp_test_RjCr3K2nZDtpjM",
      key_secret: "WDPHdHnASUr2lRZ4QnEkF46W",
      amount: pprice * 100,
      currency: "INR",
      name: "CONNECT TECHNOLOGIEZ",
      description:
        "PAYING : " +
        `${shopname}` +
        " for " +
        `${pname}` +
        " - ₹" +
        `${pprice}` +
        " | CONNECT PAY",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        console.log("ShopOwner>>>", shopowner);
        const wallets = query(
          collection(db, "wallet"),
          where("owner", "==", shopowner)
        );
        getDocs(wallets).then((snapshot) => {
          snapshot.forEach((documnt) => {
            let amt = documnt.data().amount;
            const docRef = doc(db, "wallet", documnt.id);
            updateDoc(docRef, {
              amount: parseInt(amt) + parseInt(pprice),
            });
          });
        });

        var templateParams = {
          shop_owner: shopowner,
          shop_name: shopname,
          order_from: user.email,
          productid: pid,
          productname: pname,
          productprice: pprice,
        };

        emailjs
          .send(
            "service_0dy0l3m",
            "template_si6vhcm",
            templateParams,
            "hLoc7114qR_hHP1s0"
          )
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
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
    <div className="storeshowcase">
      <div className="storeshowcase__top">
        <div className="storeshowcaseTop__info">
          <Avatar src={profileURL} />
          <h2 className="storeshowcaseTopInfo__storeTitle">{shopname}</h2>
        </div>

        <div className="storeshowcaseTop__description">{shopdescription}</div>
      </div>

      <div className="storeshowcase__middle">
        {products.map((product) => (
          <div className="productCard">
            <img src={product.pimg} alt="" />
            <p>{product.pname}</p>
            <button
              onClick={() =>
                makepayment(product.pprice, product.pname, product.pid)
              }
            >
              Pay ₹{product.pprice}
            </button>
          </div>
        ))}
      </div>
      {/* <div className="storeshowcase__bottom">
        <div className="visitStoreBtn">VISIT STORE</div>
      </div> */}
    </div>
  );
}

export default StoreShowCase;
