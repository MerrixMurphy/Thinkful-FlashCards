import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardForm from "../Forms/CardForm";
import { readDeck } from "../utils/api";

function EditCard({
  currentDeck,
  setCurrentDeck,
  currentCard,
  setCurrentCard,
}) {
  const params = useParams();

  useEffect(() => {
    readDeck(params.deckId).then(setCurrentDeck);
  }, []);

  return (
    <div>
      <h5 className={"bg-light p-2"}>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${params.deckId}`}>{currentDeck.name}</Link> / Edit
        Card {params.cardId}
      </h5>
      <h1>{currentDeck.name}: Edit Card</h1>
      <CardForm
        currentDeck={currentDeck}
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
      />
    </div>
  );
}

export default EditCard;
