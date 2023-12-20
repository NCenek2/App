import { useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
      return JSON.parse(item);
    } catch (err) {
      return defaultValue;
    }
  });

  const setItem = (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.log("ERROR when setting value");
    }
    setValue(newValue);
  };

  return [value, setItem];
};

export default useLocalStorage;
