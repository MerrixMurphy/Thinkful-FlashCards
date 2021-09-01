// If the user clicks "submit", the user is taken to the Deck screen.
import React from "react";
import { Link, useHistory } from "react-router-dom";

function CreateDeck() {
  const history = useHistory();
  return (
    <div>
      <h2>
        <Link to="/">Home</Link> / Create Deck
      </h2>
      <h1>Create Deck</h1>
      <form>
        <label for="deckName">Name</label>
        <input
          id="deckName"
          name="deckName"
          placeholder="Deck Name"
          type="text"
        ></input>
        <label for="deckDes">Description</label>
        <textarea
          id="deckDes"
          name="deckDes"
          placeholder="Brief description of the deck"
        ></textarea>
        <button onClick={() => history.push("/")}>Cancel</button>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateDeck;
