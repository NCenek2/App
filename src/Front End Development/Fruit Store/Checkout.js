import React from "react";

const Checkout = ({ fruit }) => {
  return (
    <React.Fragment>
      <p>{fruit.amount}</p>
      <p>{fruit.fruit}</p>
      <p>${fruit.total}</p>
    </React.Fragment>
  );
};

export default Checkout;
