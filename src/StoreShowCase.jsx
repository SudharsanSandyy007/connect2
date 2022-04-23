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
} from "firebase/firestore";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import emailjs from "emailjs-com";

/*
HOTSPOT | MENS WEAR
We provide top quality styles at affordable prices...! Our collections are very selective and comfortable to wear. All age and size categories are available! Happy Shopping :) 
*/
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
      key: "rzp_live_LfeNAcLrs4ckTi",
      key_secret: "ZSROC5s5brlAae1amnbnG4Ol",
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

  useEffect(() => {
    const collref = collection(db, "arraytest");
    setDoc(doc(collref, "SF"), {
      name: "San Francisco",
      state: "CA",
      country: "USA",
      capital: false,
      population: 860000,
      regions: ["west_coast", "norcal"],
    });
    getDocs(collref)
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((e) => {
        alert(e.message);
      });
  }, []);

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
      <div className="storeshowcase__bottom">
        <div className="visitStoreBtn">VISIT STORE</div>
      </div>
    </div>
  );
}

export default StoreShowCase;
