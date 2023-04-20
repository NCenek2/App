import React from "react";
const Quantity = ({ fruit, increase, decrease, markPress }) => {
  const {
    fruit: fruitName,
    total: fruitTotal,
    id: fruitId,
    amount: fruitCost,
  } = fruit;

  return (
    <article className="quantity-container">
      <p className="quantity-fruit">{fruitName}</p>
      <p className="quantity-total">${fruitTotal}</p>
      <div className="quantity-buttons">
        <button
          onClick={() => increase(fruitId, fruitCost)}
          className=" btn btn-success "
        >
          <p>+</p>
        </button>
        <div className="quantity-fruit-amount">
          <p>{fruitCost}</p>
        </div>
        <button
          onClick={() => decrease(fruitId, fruitCost)}
          className="btn btn-danger"
        >
          <p>-</p>
        </button>
      </div>
      <button
        onClick={() => markPress(fruitId)}
        className="btn btn-secondary mark-button"
      >
        <p>x</p>
      </button>
    </article>
  );
};

export default Quantity;
