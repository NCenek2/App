import { useState } from "react";

const useSessionStorage = <T,>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      let item = sessionStorage.getItem(key);
      if (item === null) {
        sessionStorage.setItem(key, JSON.stringify(defaultValue));
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
      sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.error(`Error when attempting to set ${key}`);
    }
    setValue(newValue);
  };

  return [value, setItem] as const;
};

export default useSessionStorage;
