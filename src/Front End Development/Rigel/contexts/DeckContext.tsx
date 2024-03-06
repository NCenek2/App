import React, {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
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

export type Card = {
  [key: string]: any;
  card_id: number;
  term: string;
  definition: string;
};

export type NewCard = {
  deck_id: number;
  term: string;
  definition: string;
};

export type DeckData = {
  deck_id: number;
  deck_name: string;
  cards: Card[];
};

export type DeckContextType = {
  decks: DeckData[];
  setDecks: Dispatch<SetStateAction<DeckData[]>>;
};

export const organizeData = (
  deckNames: ViewDecksResponse[],
  deckInfo: AllDeckInfoResponse[]
): DeckData[] => {
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

  let output: DeckData[] = [];

  for (let id in temp) {
    output.push({
      deck_id: Number(id),
      deck_name: temp[id].deck_name,
      cards: temp[id].cards,
    });
  }

  return output;
};

const useDeckContext = () => {
  const [decks, setDecks] = useLocalStorage<DeckData[]>("decks", []);

  return { decks, setDecks };
};

export type UseDeckContextType = ReturnType<typeof useDeckContext>;

const useDeckContextType: UseDeckContextType = {
  decks: [],
  setDecks: () => {},
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
