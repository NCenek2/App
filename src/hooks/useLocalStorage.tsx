import { useState } from "react";

const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
      const parsedItem = JSON.parse(item) as T;
      return parsedItem;
    } catch (err) {
      return defaultValue;
    }
  });

  const setItem = (newValue: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.error(`Error when attempting to set ${key}`);
    }
    setValue(newValue);
  };

  return [value, setItem] as const;
};

export default useLocalStorage;
