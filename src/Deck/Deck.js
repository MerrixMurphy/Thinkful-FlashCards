import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  deleteCard,
  deleteDeck,
  listCards,
  readDeck,
  listDecks,
} from "../utils/api";

function Deck({ currentDeck, setCurrentDeck, cards, setCards, setDecks }) {
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    readDeck(params.deckId).then(setCurrentDeck);
    listCards(params.deckId).then(setCards);
  }, []);

  const delThisDeck = () => {
    if (
      window.confirm(
        "Delete this deck? \n\n You will not be able to recover it."
      )
    ) {
      deleteDeck(params.deckId).then(() => listDecks().then(setDecks));
      setCurrentDeck([]);
      setCards([]);
      history.push("/");
    }
  };

  const delThisCard = (event) => {
    if (
      window.confirm(
        "Delete this card? \n\n You will not be able to recover it."
      )
    ) {
      deleteCard(event.target.id).then(() =>
        listCards(params.deckId).then(setCards)
      );
    }
  };

  return (
    <div>
      <h2>
        <Link to="/">Home</Link> / {currentDeck.name}
      </h2>
      <h1>{currentDeck.name}</h1>
      <p>{currentDeck.description}</p>
      <button onClick={() => history.push(`/decks/${params.deckId}/edit`)}>
        Edit
      </button>
      <button onClick={() => history.push(`/decks/${params.deckId}/study`)}>
        Study
      </button>
      <button onClick={() => history.push(`/decks/${params.deckId}/cards/new`)}>
        Add Cards
      </button>
      <button onClick={delThisDeck}>Delete</button>
      <h1>Cards</h1>
      {cards.map((card) => (
        <div>
          <p>{card.front}</p>
          <p>{card.back}</p>
          <button
            onClick={() =>
              history.push(`/decks/${params.deckId}/cards/${card.id}/edit`)
            }
          >
            Edit
          </button>
          <button id={card.id} onClick={delThisCard}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Deck;
