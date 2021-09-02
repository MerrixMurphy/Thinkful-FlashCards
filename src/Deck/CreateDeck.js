import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, createDeck } from "../utils/api";

function CreateDeck() {
  const history = useHistory();
  const [currentDeckAmount, setCurrentDeckAmount] = useState(0);

  useEffect(() => {
    listDecks().then((response) => setCurrentDeckAmount(response.length));
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const currentDeckNum = currentDeckAmount + 1;
    const deckName = document.getElementById("deckName").value;
    const deckDes = document.getElementById("deckDes").value;
    const deckCriteria = {
      id: currentDeckNum,
      name: deckName,
      description: deckDes,
    };
    createDeck(deckCriteria);
    history.push(`/decks/${currentDeckNum}`);
  };
  return (
    <div>
      <h2>
        <Link to="/">Home</Link> / Create Deck
      </h2>
      <h1>Create Deck</h1>
      <form onSubmit={submitHandler}>
        <label for="deckName">Name</label>
        <input
          required
          id="deckName"
          name="deckName"
          placeholder="Deck Name"
          type="text"
        ></input>
        <label for="deckDes">Description</label>
        <textarea
          required
          id="deckDes"
          name="deckDes"
          placeholder="Brief description of the deck"
        ></textarea>
        <button onClick={() => history.push("/")}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateDeck;
