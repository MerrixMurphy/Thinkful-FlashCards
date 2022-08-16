import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck, listDecks } from "../utils/api";

function Deck({ currentDeck, setCurrentDeck, setDecks }) {
  const history = useNavigate();
  const params = useParams();

  // UseEffect to set current Deck.
  useEffect(() => {
    readDeck(params.deckId).then(setCurrentDeck);
  }, [params.deckId, setCurrentDeck]);

  // An onclick handler to delete current Deck.
  const delThisDeck = () => {
    if (
      window.confirm(
        "Delete this deck? \n\n You will not be able to recover it."
      )
    ) {
      deleteDeck(params.deckId).then(() => listDecks().then(setDecks));
      setCurrentDeck([]);
      history("/");
    }
  };

  // An onclick handler to delete specific cards.
  const delThisCard = (event) => {
    if (
      window.confirm(
        "Delete this card? \n\n You will not be able to recover it."
      )
    ) {
      deleteCard(event.target.id).then(() =>
        readDeck(params.deckId).then(setCurrentDeck)
      );
    }
  };

  return currentDeck.cards ? (
    // Render Deck information and a list of each card.
    <div>
      <h5 className={"bg-light p-2"}>
        <Link to="/">Home</Link> / {currentDeck.name}
      </h5>
      <h1>{currentDeck.name}</h1>
      <p>{currentDeck.description}</p>
      <div className={"d-flex justify-content-between"}>
        <div>
          <button
            className={"bg-secondary text-white btn btn-outline-light"}
            onClick={() => history(`/decks/${params.deckId}/edit`)}
          >
            Edit
          </button>
          <button
            className={"bg-primary text-white btn btn-outline-light"}
            onClick={() => history(`/decks/${params.deckId}/study`)}
          >
            Study
          </button>
          <button
            className={"bg-primary text-white btn btn-outline-light"}
            onClick={() => history(`/decks/${params.deckId}/cards/new`)}
          >
            Add Cards
          </button>
        </div>
        <button
          className={"bg-danger text-white btn btn-outline-light"}
          onClick={delThisDeck}
        >
          Delete
        </button>
      </div>
      <h1>Cards</h1>
      {currentDeck.cards.map((card, index) => (
        <div className={"border"} key={index}>
          <div className={"row"}>
            <p className={"col"}>{card.front}</p>
            <p className={"col"}>{card.back}</p>
          </div>
          <div className={"d-flex justify-content-end"}>
            <button
              className={"bg-secondary text-white btn btn-outline-light"}
              onClick={() =>
                history(`/decks/${params.deckId}/cards/${card.id}/edit`)
              }
            >
              Edit
            </button>
            <button
              className={"bg-danger text-white btn btn-outline-light"}
              id={card.id}
              onClick={delThisCard}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : null;
}

export default Deck;
