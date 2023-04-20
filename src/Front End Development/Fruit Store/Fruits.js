import React from "react";
import Fruit from "./Fruit";
const Fruits = ({ fruits, handleSelected }) => {
  return (
    <div className="content-section">
      <section className="fruits-container">
        {fruits.map((fruit) => (
          <Fruit key={fruit.id} fruit={fruit} handleSelected={handleSelected} />
        ))}
      </section>
    </div>
  );
};

export default Fruits;
