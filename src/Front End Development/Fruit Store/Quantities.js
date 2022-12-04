import React from "react";
import Quantity from "./Quantity";
const Quantities = ({ fruits, increase, decrease, markPress }) => {
  return (
    <section className="quantities-container" style={{ marginTop: "30px" }}>
      {fruits
        .filter((fruit) => fruit.selected === true)
        .map((fruit) => (
          <Quantity
            key={fruit.id}
            fruit={fruit}
            increase={increase}
            decrease={decrease}
            markPress={markPress}
          />
        ))}
    </section>
  );
};

export default Quantities;
