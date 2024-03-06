import { Card, DeckData, NewCard } from "../../contexts/DeckContext";
import { useAlert } from "../useAlert";
import useDeck from "../useDeck";

type DeckDataInfo = {
  deck_id: number;
  deck_name_old: string;
  deck_name: string;
};

type useUpdateDecksProps = {
  deckData: DeckDataInfo;
  deleted: number[];
  updated: Card[];
  created: NewCard[];
};

const useDeckService = () => {
  const { decks, setDecks } = useDeck();
  const { setAlert } = useAlert();

  const addDeck = async () => {
    setTimeout(() => {}, 1000);
    const deck_name = "New Deck";
    const deck_id =
      decks.reduce(
        (accumulator, deck) => Math.max(deck.deck_id, accumulator),
        0
      ) + 1 || 0;

    const newDeck: DeckData = {
      deck_id,
      deck_name,
      cards: [],
    };

    if (decks.length >= 5) {
      setAlert("Cannot exceed 5 decks");
      return;
    }
    setDecks([...decks, newDeck]);
  };
  const updateDecks = async ({
    deckData,
    deleted,
    updated,
    created,
  }: useUpdateDecksProps) => {
    const { deck_id, deck_name } = deckData;
    setDecks(
      decks.map((deck) => {
        if (deck.deck_id === deck_id) {
          deck.deck_name = deck_name;

          for (let deleted_id of deleted) {
            deck.cards = deck.cards.filter(
              (card) => card.card_id !== deleted_id
            );
          }

          for (let updatedCard of updated) {
            deck.cards = deck.cards.map((card) => {
              if (card.card_id === updatedCard.card_id) {
                return updatedCard;
              }
              return card;
            });
          }

          for (let createdCard of created) {
            const { term, definition } = createdCard;
            const card_id =
              deck.cards.reduce(
                (accumulator, deck) => Math.max(deck.deck_id, accumulator),
                0
              ) + 1 || 0;

            const newCard = { card_id, term, definition };
            deck.cards = [...deck.cards, newCard];
          }
          return deck;
        }
        return deck;
      })
    );
  };

  const deleteDeck = async (deck_id: number) => {
    setTimeout(() => {}, 1000);
    setDecks(decks.filter((deck) => deck.deck_id !== deck_id));
  };

  return { addDeck, deleteDeck, updateDecks };
};

export default useDeckService;
