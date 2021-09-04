import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DeckForm from "../Forms/DeckForm";

function CreateDeck() {
  const history = useHistory();
  const [currentDeckAmount, setCurrentDeckAmount] = useState(0);

  if (currentDeckAmount > 0) {
    history.push(`/decks/${currentDeckAmount}`);
  }

  return (
    <div>
      <h5 className={"bg-light p-2"}>
        <Link to="/">Home</Link> / Create Deck
      </h5>
      <h1>Create Deck</h1>
      <DeckForm setCurrentDeckAmount={setCurrentDeckAmount} />
    </div>
  );
}

export default CreateDeck;
