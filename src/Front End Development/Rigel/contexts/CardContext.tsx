import React, { createContext, ReactNode, useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";

export type Card = {
  [key: string]: any;
  deck_id: number;
  card_id: number;
  term: string;
  definition: string;
};

export type NewCard = {
  [key: string]: any;
  deck_id: number;
  card_id: number | string;
  term: string;
  definition: string;
};

const useCardContext = () => {
  const [cards, setCards] = useLocalStorage<Card[]>("cards", []);
  const [madeChanges, setMadeChanges] = useState(false);

  function resetCards() {
    setMadeChanges(false);
  }

  return {
    cards,
    setCards,
    madeChanges,
    setMadeChanges,
    resetCards,
  };
};

export type UseCardContextType = ReturnType<typeof useCardContext>;

const useCardContextType: UseCardContextType = {
  cards: [],
  setCards: () => {},
  madeChanges: false,
  setMadeChanges: () => {},
  resetCards: () => {},
};

export const CardContext =
  createContext<UseCardContextType>(useCardContextType);

type ChildrenType = {
  children?: ReactNode | ReactNode[];
};

export const CardProvider = ({ children }: ChildrenType) => {
  return (
    <CardContext.Provider value={useCardContext()}>
      {children}
    </CardContext.Provider>
  );
};

export default CardProvider;
