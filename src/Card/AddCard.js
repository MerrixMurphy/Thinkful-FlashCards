import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardForm from "../Forms/CardForm";
import { readDeck } from "../utils/api";

function AddCard({ currentDeck, setCurrentDeck }) {
  const params = useParams();

  useEffect(() => {
    readDeck(params.deckId).then(setCurrentDeck);
  }, []);
  return (
    <div>
      <h5 className={"bg-light p-2"}>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${params.deckId}`}>{currentDeck.name}</Link> / Add
        Card
      </h5>
      <h1>{currentDeck.name}: Add Card</h1>
      <CardForm currentDeck={currentDeck} />
    </div>
  );
}

export default AddCard;
