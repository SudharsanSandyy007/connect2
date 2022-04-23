import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import StoreShowCase from "./StoreShowCase";

function ShopsContainer() {
  const [shops, setshops] = useState([]);

  useEffect(() => {
    const collref = collection(db, "shops");
    let tempshops = [];

    getDocs(collref).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        tempshops.push({ id: doc.id, ...doc.data() });
      });
      setshops(tempshops);
    });
  }, []);

  console.log("Shops>>>>", shops);
  return (
    <div>
      {shops.map((shop) => (
        <StoreShowCase
          key={shop.id}
          shopid={shop.id}
          shopname={shop.name}
          shopdescription={shop.description}
          profileURL={shop.profileURL}
          products={shop.products}
          shopowner={shop.shopowner}
        />
      ))}
    </div>
  );
}

export default ShopsContainer;
