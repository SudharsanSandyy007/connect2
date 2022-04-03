import React from "react";
import "./WithdrawalHisComp.css";

function WithdrawalHisComp({ by, on, amt }) {
  return (
    <div className="withdrawalHisComp">
      <b>Withdrawal Amount: </b> <span>₹{amt}</span>
      <p>{new Date(on?.toDate()).toLocaleString()}</p>
    </div>
  );
}

export default WithdrawalHisComp;
