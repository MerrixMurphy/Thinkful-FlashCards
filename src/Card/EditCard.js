import React from "react";
import { Link } from "react-router-dom";
import CardForm from "../Forms/CardForm";

function EditCard({ currentDeck, currentCard, setCurrentCard }) {
  return (
    <div>
      <h2>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link> / Edit
        Card {"1"}
      </h2>
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
