import React from "react";
const Quantity = ({ fruit, increase, decrease, markPress }) => {
  return (
    <article className="quantity-container">
      <p className="quantity-fruit">{fruit.fruit}</p>
      <p className="quantity-total">${fruit.total}</p>
      <div className="quantity-buttons">
        <button
          onClick={() => increase(fruit.id, fruit.amount)}
          className=" btn btn-success "
        >
          <p>+</p>
        </button>
        <div className="quantity-fruit-amount">
          <p>{fruit.amount}</p>
        </div>
        <button
          onClick={() => decrease(fruit.id, fruit.amount)}
          className="btn btn-danger"
        >
          <p>-</p>
        </button>
      </div>
      <button
        onClick={() => markPress(fruit.id)}
        className="btn btn-secondary mark-button"
      >
        <p>x</p>
      </button>
    </article>
  );
};

export default Quantity;
