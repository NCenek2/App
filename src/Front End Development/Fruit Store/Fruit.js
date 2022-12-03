import React from "react";
const Fruit = ({ fruit, handleSelected }) => {
  return (
    <article
      onClick={() => handleSelected(fruit.id)}
      className="fruit-container"
      style={
        fruit.selected
          ? {
              border: "3px solid blue",
              boxShadow: "4px 2px 10px blue",
            }
          : { border: "3px solid white" }
      }
    >
      <h2 className="fruit-container-title">{fruit.fruit}</h2>
      <img className="fruit-container-image" src={fruit.url} alt={fruit.id} />
    </article>
  );
};

export default Fruit;
