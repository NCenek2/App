import React, { useEffect, useState } from "react";
import "./FruitStore.css";
import Fruits from "./Fruits";
import Sections from "./Sections";
import Quantities from "./Quantities";
import Checkouts from "./Checkouts";
import fruitsData, { sectionsData } from "./FruitStoreData";

function FruitStore() {
  const [sections, setSections] = useState(sectionsData);
  const [fruits, setFruits] = useState(fruitsData);

  const [isDisabled, setIsDisabled] = useState(true);

  const [sectionOn, setSectionOn] = useState("Pick Fruits");

  useEffect(() => {
    if (fruits.filter((fruit) => fruit.amount !== 0).length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [fruits]);

  const handleSection = (name) => {
    setSectionOn(name);
  };

  const handleSelected = (inputID) => {
    let filteredObject = fruits.filter((fruit) => fruit.id === inputID);
    let fruitSelected = filteredObject.map((item) => item.fruit);
    setFruits((currentFruits) =>
      currentFruits.map((fruit) => {
        if (fruit.id === inputID) {
          const updatedObject = {
            ...fruit,
            selected: !fruit.selected,
            amount: Number(!fruit.amount),
            total: fruit.price,
          };
          return updatedObject;
        }
        return fruit;
      })
    );
  }; // End handle Selected

  const increaseFruitCount = (inputID, inputAmount) => {
    setFruits((currentFruits) =>
      currentFruits.map((fruit) => {
        if (fruit.id === inputID) {
          const updatedTotal = eval(fruit.price * (fruit.amount + 1).toString())
            .toFixed(2)
            .toString();
          const updatedObject = {
            ...fruit,
            amount: inputAmount + 1,
            total: updatedTotal,
          };
          return updatedObject;
        }
        return fruit;
      })
    );
    if (fruits.filter((fruit) => fruit.amount > 0).length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const decreaseFruitCount = (inputID, inputAmount) => {
    setFruits((currentFruits) =>
      currentFruits.map((fruit) => {
        if (fruit.id === inputID) {
          const updatedTotal = eval(fruit.price * (fruit.amount - 1).toString())
            .toFixed(2)
            .toString();
          if (fruit.amount > 0) {
            const updatedObject = {
              ...fruit,
              amount: inputAmount - 1,
              total: updatedTotal,
            };
            return updatedObject;
          } else {
            const updatedObject = { ...fruit };
            return updatedObject;
          }
        }
        return fruit;
      })
    );
  };

  const onMarkPress = (inputID) => {
    setFruits((currentFruits) =>
      currentFruits.map((fruit) => {
        if (fruit.id === inputID) {
          const updatedObject = {
            ...fruit,
            amount: 0,
            total: "0.00",
            selected: false,
          };
          return updatedObject;
        }
        return fruit;
      })
    );
    if (fruits.filter((fruit) => fruit.amount > 0).length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <main className="fruit-store-container">
      <div className="counter">
        <p>{fruits.filter((fruit) => fruit.selected === true).length}</p>
      </div>
      <header className="header-fruit-store">
        <h1>Ceneks Fruit Store</h1>
        <Sections
          sections={sections}
          sectionOn={sectionOn}
          handleSection={handleSection}
          fruits={fruits}
        />
      </header>
      {sectionOn === "Pick Fruits" ? (
        <div className="content-section">
          <Fruits fruits={fruits} handleSelected={handleSelected} />
        </div>
      ) : sectionOn === "Select Quantity" ? (
        <Quantities
          fruits={fruits}
          increase={increaseFruitCount}
          decrease={decreaseFruitCount}
          markPress={onMarkPress}
        />
      ) : (
        <Checkouts
          fruits={fruits}
          isDisabled={isDisabled}
          handleName={handleName}
          handleEmail={handleEmail}
          name={name}
          email={email}
        />
      )}
    </main>
  );
}

export default FruitStore;
