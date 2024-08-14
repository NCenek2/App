import React, {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
} from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";

type ViewDecksResponse = {
  user_id: number;
  deck_id: number;
  deck_name: string;
};

type AllDeckInfoResponse = {
  deck_id: number;
  deck_name: string;
  card_id: number;
  term: string;
  definition: string;
};

export type Deck = {
  deck_id: number;
  deck_name: string;
  card_count: number;
};

export type DeckContextType = {
  decks: Deck[];
  setDecks: Dispatch<SetStateAction<Deck[]>>;
};

export const organizeData = (
  deckNames: ViewDecksResponse[],
  deckInfo: AllDeckInfoResponse[]
): Deck[] => {
  let temp: any = {};
  for (let deck of deckNames) {
    const { deck_id, deck_name } = deck;
    temp[deck_id] = {
      deck_name,
      cards: [],
    };
  }

  for (let card of deckInfo) {
    const { deck_id, card_id, term, definition } = card;
    temp[deck_id].cards.push({
      card_id,
      term,
      definition,
    });
  }

  let output: Deck[] = [];

  for (let id in temp) {
    output.push({
      deck_id: Number(id),
      deck_name: temp[id].deck_name,
      card_count: temp[id].card_count,
    });
  }

  return output;
};

const useDeckContext = () => {
  const [decks, setDecks] = useLocalStorage<Deck[]>("decks", []);
  const [currentDeck, setCurrentDeck] = useState<Deck | null>(null);

  const exitMode = () => {
    setCurrentDeck(null);
  };

  return { decks, setDecks, currentDeck, setCurrentDeck, exitMode };
};

export type UseDeckContextType = ReturnType<typeof useDeckContext>;

const useDeckContextType: UseDeckContextType = {
  decks: [],
  setDecks: () => {},
  currentDeck: null,
  setCurrentDeck: () => {},
  exitMode: () => {},
};

export const DeckContext =
  createContext<UseDeckContextType>(useDeckContextType);

type ChildrenType = {
  children?: ReactNode | ReactNode[];
};

export const DeckProvider = ({ children }: ChildrenType) => {
  return (
    <DeckContext.Provider value={useDeckContext()}>
      {children}
    </DeckContext.Provider>
  );
};

export default DeckProvider;
