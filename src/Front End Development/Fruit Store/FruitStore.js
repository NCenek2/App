import React from "react";
import "./FruitStore.css";
import Fruits from "./Fruits";
import Sections from "./Sections";
import Quantities from "./Quantities";
import Checkouts from "./Checkouts";
import fruitsData, { sectionsData } from "./FruitStoreData";

function FruitStore() {
  const sections = sectionsData;
  const [fruits, setFruits] = React.useState(fruitsData);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [currentSection, setCurrentSection] = React.useState("Pick Fruits");
  const [checkoutInputs, setCheckoutInputs] = React.useState({
    name: "",
    email: "",
  });

  React.useEffect(() => {
    if (fruits.filter((fruit) => fruit.amount !== 0).length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [fruits]);

  const handleSection = (clickedSection) => {
    setCurrentSection(clickedSection);
  };

  const handleSelected = (inputID) => {
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
  };

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

  const handleCheckoutInputs = (event) => {
    const { name, value } = event.target;

    setCheckoutInputs((prevCheckoutInputs) => {
      if (name == "name") {
        return {
          ...prevCheckoutInputs,
          name: value,
        };
      } else {
        return {
          ...prevCheckoutInputs,
          email: value,
        };
      }
    });
  };

  return (
    <main className="fruit-store-container">
      <div className="counter">
        <p>
          {
            fruits.filter(
              (fruit) => fruit.selected === true && fruit.amount > 0
            ).length
          }
        </p>
      </div>
      <header className="header-fruit-store">
        <h1>Ceneks Fruit Store</h1>
        <Sections
          sections={sections}
          currentSection={currentSection}
          handleSection={handleSection}
          fruits={fruits}
        />
      </header>
      {currentSection === "Pick Fruits" ? (
        <Fruits fruits={fruits} handleSelected={handleSelected} />
      ) : currentSection === "Select Quantity" ? (
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
          checkoutInputs={checkoutInputs}
          handleCheckoutInputs={handleCheckoutInputs}
        />
      )}
    </main>
  );
}

export default FruitStore;
