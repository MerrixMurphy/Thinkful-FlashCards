import React from "react";
import { Link } from "react-router-dom";
import DeckForm from "../Forms/DeckForm";

function CreateDeck() {
  return (
    // Render New Deck Form.
    <div>
      <h5 className={"bg-light p-2"}>
        <Link to="/">Home</Link> / Create Deck
      </h5>
      <h1>Create Deck</h1>
      <DeckForm />
    </div>
  );
}

export default CreateDeck;
