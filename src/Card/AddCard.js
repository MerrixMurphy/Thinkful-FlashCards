import React from "react";
import { Link } from "react-router-dom";
import CardForm from "../Forms/CardForm";

function AddCard({ currentDeck }) {
  return (
    <div>
      <h2>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link> / Add
        Card
      </h2>
      <h1>{currentDeck.name}: Add Card</h1>
      <CardForm currentDeck={currentDeck} />
    </div>
  );
}

export default AddCard;
