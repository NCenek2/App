import { useState } from "react";

const useSessionStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      if (!item) {
        sessionStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
      return JSON.parse(item);
    } catch (err) {
      return defaultValue;
    }
  });

  const setItem = (newValue) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.log("ERROR when setting value");
    }
    setValue(newValue);
  };

  return [value, setItem];
};

export default useSessionStorage;
