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
      <h5 className={"bg-light p-2"}>
        <Link to="/">Home</Link> / {currentDeck.name}
      </h5>
      <h1>{currentDeck.name}</h1>
      <p>{currentDeck.description}</p>
      <div className={"d-flex justify-content-between"}>
        <div>
          <button
            className={"bg-secondary text-white"}
            onClick={() => history.push(`/decks/${params.deckId}/edit`)}
          >
            Edit
          </button>
          <button
            className={"bg-primary text-white"}
            onClick={() => history.push(`/decks/${params.deckId}/study`)}
          >
            Study
          </button>
          <button
            className={"bg-primary text-white"}
            onClick={() => history.push(`/decks/${params.deckId}/cards/new`)}
          >
            Add Cards
          </button>
        </div>
        <button className={"bg-danger text-white"} onClick={delThisDeck}>
          Delete
        </button>
      </div>
      <h1>Cards</h1>
      {cards.map((card, index) => (
        <div className={"border"} key={index}>
          <p>{card.front}</p>
          <p>{card.back}</p>
          <div className={"d-flex justify-content-end"}>
            <button
              className={"bg-secondary text-white"}
              onClick={() =>
                history.push(`/decks/${params.deckId}/cards/${card.id}/edit`)
              }
            >
              Edit
            </button>
            <button
              className={"bg-danger text-white"}
              id={card.id}
              onClick={delThisCard}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deck;
