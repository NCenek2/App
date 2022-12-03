import React from "react";
import Fruit from "./Fruit";
const Fruits = ({ fruits, handleSelected }) => {
  return (
    <section className="fruits-container">
      {fruits.map((fruit) => (
        <Fruit key={fruit.id} fruit={fruit} handleSelected={handleSelected} />
      ))}
    </section>
  );
};

export default Fruits;
