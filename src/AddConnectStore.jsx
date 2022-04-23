import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import "./AddConnectStore.css";

function AddConnectStore() {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [profileURL, setprofileURL] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const createShop = () => {
    const collref = collection(db, "shops");
    const noofproducts = prompt("Enter number of products: ");

    var i;
    let pid, pname, pprice, pimg;

    let products = [];
    for (i = 1; i <= noofproducts; i++) {
      pid = prompt("Enter product id of product" + i + " : ");
      pimg = prompt("Enter product image of product" + i + " : ");
      pname = prompt("Enter product name of product" + i + " :");
      pprice = prompt("Enter product price of product " + i + " :");

      products.push({ pid, pname, pimg, pprice });
    }

    setDoc(doc(collref, name), {
      name: name,
      shopowner: user.email,
      description: description,
      profileURL: profileURL,
      products: products,
    });
  };

  return (
    <div className="addconnectstore">
      <div className="addconnectstore__container">
        <h1 className="addconnectstore__title">ADD CONNECT STORE</h1>
        <input
          className="addconnectstore__ipbox"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Store Name"
        />
        <input
          type="text"
          className="addconnectstore__ipbox"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
          placeholder="Enter Store description"
        />
        <input
          type="text"
          className="addconnectstore__ipbox"
          value={profileURL}
          onChange={(e) => {
            setprofileURL(e.target.value);
          }}
          placeholder="Enter profile pic: "
        />{" "}
        <br /> <br />
        <button className="addconnectstore__btn" onClick={createShop}>
          CREATE SHOP
        </button>
      </div>
    </div>
  );
}

export default AddConnectStore;
