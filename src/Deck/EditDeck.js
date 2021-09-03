import React from "react";
import { Link } from "react-router-dom";
import DeckForm from "../Forms/DeckForm";

function EditDeck({ currentDeck, setCurrentDeck }) {
  return (
    <div>
      <h2>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link> / Edit
        Deck
      </h2>
      <h1>Edit Deck</h1>
      <DeckForm setCurrentDeck={setCurrentDeck} currentDeck={currentDeck} />
    </div>
  );
}

export default EditDeck;
