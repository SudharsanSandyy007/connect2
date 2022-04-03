import { Avatar } from "@mui/material";
import React from "react";
import "./StoreShowCase.css";
function StoreShowCase() {
  return (
    <div className="storeshowcase">
      <div className="storeshowcase__top">
        <div className="storeshowcaseTop__info">
          <Avatar src="https://lh3.googleusercontent.com/0Eri03AFLx4iDsBqY55zVSMNm59Jtt8RsymYZNsUgW-v1cMInXme2Os9r8R475I8tMfOW9A6v4Qp-jU3k8rM_dVWThA=w512" />
          <h2 className="storeshowcaseTopInfo__storeTitle">
            HOTSPOT | MENS WEAR
          </h2>
        </div>

        <div className="storeshowcaseTop__description">
          We provide top quality styles at affordable prices...! Our collections
          are very selective and comfortable to wear. All age and size
          categories are available! Happy Shopping :)
        </div>
      </div>

      <div className="storeshowcase__middle">
        <div className="productCard">
          <img
            src="https://5.imimg.com/data5/YX/OO/TA/ANDROID-108727015/product-jpeg-500x500.jpg"
            alt=""
          />
          <p>ALONE - Tshirt | ₹500</p>
          <button>Pay ₹500</button>
        </div>
        <div className="productCard">
          <img
            src="https://rukminim1.flixcart.com/image/332/398/kkfrjww0/t-shirt/h/1/t/l-t312-cgblwh-new-eyebogler-original-imafzs5hrjgzsfpr.jpeg?q=50"
            alt=""
          />
          <p>ALONE - Tshirt | ₹500</p>
          <button>Pay ₹500</button>
        </div>
        <div className="productCard">
          <img
            src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/8938905/2019/4/22/87f43813-3f79-44c6-b24f-10bb2f546ce61555939169332-Roadster-Men-Black-Printed-Round-Neck-T-shirt-22215559391680-1.jpg"
            alt=""
          />
          <p>ALONE - Tshirt | ₹500</p>
          <button>Pay ₹500</button>
        </div>
        <div className="productCard">
          <img
            src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2521204/2018/2/26/11519626464547-na-8991519626464330-1.jpg"
            alt=""
          />
          <p>ALONE - Tshirt | ₹500</p>
          <button>Pay ₹500</button>
        </div>
        <div className="productCard">
          <img
            src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2521204/2018/2/26/11519626464547-na-8991519626464330-1.jpg"
            alt=""
          />
          <p>ALONE - Tshirt | ₹500</p>
          <button>Pay ₹500</button>
        </div>
        <div className="productCard">
          <img
            src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2521204/2018/2/26/11519626464547-na-8991519626464330-1.jpg"
            alt=""
          />
          <p>ALONE - Tshirt | ₹500</p>
          <button>Pay ₹500</button>
        </div>
      </div>
      <div className="storeshowcase__bottom">
        <div className="visitStoreBtn">VISIT STORE</div>
      </div>
    </div>
  );
}

export default StoreShowCase;
