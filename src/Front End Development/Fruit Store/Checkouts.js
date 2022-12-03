import React from "react";
import Checkout from "./Checkout";

const handleSubmit = (event, name, email) => {
  event.preventDefault();
  alert(
    `Thank you ${name} for your purchase! \n\n Your receipt will be sent to ${email}.`
  );
};
const Checkouts = ({
  fruits,
  isDisabled,
  handleName,
  handleEmail,
  name,
  email,
}) => {
  return !isDisabled ? (
    <section className="checkouts-container">
      <div className="checkouts-items">
        <h2>Quantity</h2>
        <h2>Fruit</h2>
        <h2>Price</h2>
        {fruits
          .filter((fruit) => fruit.selected == true && fruit.total > 0)
          .map((fruit) => (
            <Checkout key={fruit.id} fruit={fruit} />
          ))}
      </div>
      <div className="checkouts-totals">
        <p>Total</p>
        <p>
          $
          {fruits
            .filter((fruit) => fruit.selected == true && fruit.total > 0)
            .reduce((sum, item) => {
              const number = parseFloat(item.total);
              return sum + number;
            }, 0)
            .toFixed(2)}
        </p>
      </div>
      <form className="checkouts-form-container">
        <h2>Order Sent to Email</h2>
        <div className="checkouts-input-container">
          <p>Name:</p>
          <input
            type="text"
            value={name}
            onChange={(event) => handleName(event)}
            required
          />
        </div>
        <div className="checkouts-input-container">
          <p>Email:</p>
          <input
            type="email"
            value={email}
            onChange={(event) => handleEmail(event)}
            required
          />
        </div>
        <div className="checkouts-submit-container">
          <button
            onClick={(event) => handleSubmit(event, name, email)}
            type="submit"
            className="btn btn-light"
            disabled={isDisabled}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default Checkouts;
