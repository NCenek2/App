import { Card, NewCard } from "../../contexts/CardContext";
import { Deck } from "../../contexts/DeckContext";
import { useAlert } from "../useAlert";
import useCard from "../useCard";
import useDeck from "../useDeck";

type DeckDataInfo = {
  deck_id: number;
  deck_name_old: string;
  deck_name: string;
};

type useUpdateDecksProps = {
  deckData: DeckDataInfo;
  deletedSet: Set<number>;
  updated: Card[];
  created: NewCard[];
};

const useDeckService = () => {
  const { decks, setDecks } = useDeck();
  const { cards, setCards } = useCard();
  const { setAlert } = useAlert();

  const addDeck = async () => {
    setTimeout(() => {}, 1000);
    const deck_id =
      decks.reduce(
        (accumulator, deck) => Math.max(deck.deck_id, accumulator),
        0
      ) + 1 || 1;

    const deck_name = `New Deck ${deck_id}`;
    const newDeck: Deck = {
      deck_id,
      deck_name,
      card_count: 0,
    };

    if (decks.length >= 5) {
      setAlert("Cannot exceed 5 decks");
      return;
    }

    setDecks([...decks, newDeck]);
  };

  const updateDecks = async ({
    deckData,
    deletedSet,
    updated,
    created,
  }: useUpdateDecksProps) => {
    const { deck_id, deck_name } = deckData;

    let newCards = [...cards];

    let cardDifference = newCards.length;

    // Handle Deleted Cards
    newCards = newCards.filter((card) => !deletedSet.has(card.card_id));

    for (let updatedCard of updated) {
      newCards = newCards.map((card) => {
        if (card.card_id === updatedCard.card_id) {
          return updatedCard;
        }
        return card;
      });
    }

    // Using the card id to get the current card id
    // and what would be next
    let card_id =
      newCards.reduce(
        (accumulator, card) => Math.max(card.card_id, accumulator),
        0
      ) + 1 || 1;

    for (let createdCard of created) {
      const newCard = { ...createdCard, card_id };
      card_id++;
      newCards.push(newCard);
    }

    cardDifference = newCards.length - cardDifference;

    const newDecks = decks.map((deck) => {
      if (deck.deck_id === deck_id) {
        return {
          ...deck,
          deck_name,
          card_count: deck.card_count + cardDifference,
        };
      }
      return deck;
    });

    setDecks(newDecks);
    setCards(newCards);
  };

  const deleteDeck = async (deck_id: number) => {
    setTimeout(() => {}, 1000);

    const newDecks = decks.filter((deck) => deck.deck_id !== deck_id);
    setDecks(newDecks);

    const newCards = cards.filter((card) => card.deck_id !== deck_id);
    setCards(newCards);
  };

  return { addDeck, deleteDeck, updateDecks };
};

export default useDeckService;
