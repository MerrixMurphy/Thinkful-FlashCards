import React, { useEffect, useState } from "react";
import { updateDeck, createDeck, readDeck } from "../utils/api";
import { useNavigate } from "react-router-dom";

function DeckForm({ currentDeck, setCurrentDeck }) {
  const history = useNavigate();
  const [deckUpdate, setDeckUpdate] = useState({});

  // A submit handler for the form.
  const submitHandler = (event) => {
    event.preventDefault();

    // If we are editing a deck, set the state of the deckUpdate object to include an id.
    if (currentDeck) {
      deckUpdate.id = currentDeck.id;
    }

    // If we are editing update the deck with the updateDeck state, otherwise create a new deck then push to it.
    currentDeck
      ? updateDeck(deckUpdate)
      : createDeck(deckUpdate).then((response) =>
          history(`/decks/${response.id}`)
        );

    // If we are editing, read the current deck then set the deck and push to the new Deck page.
    if (currentDeck) {
      readDeck(currentDeck.id)
        .then(setCurrentDeck)
        .then(() => history(`/decks/${currentDeck.id}`));
    }
  };

  // An onchange handler that sets the input values when changes are made.
  const onChangeHandler = () => {
    const deckName = document.getElementById("deckName").value;
    const deckDes = document.getElementById("deckDes").value;
    setDeckUpdate({ name: deckName, description: deckDes });
  };

  // A useEffect to set the value of the inputs to the current deck information.
  useEffect(() => {
    if (currentDeck) {
      setDeckUpdate({
        name: currentDeck.name,
        description: currentDeck.description,
      });
    }
  }, [currentDeck, setDeckUpdate]);

  return (
    <form onSubmit={submitHandler}>
      <div className={"col-1"}>
        <label htmlFor="deckName">Name</label>
        <input
          required
          id="deckName"
          name="deckName"
          type="text"
          placeholder="Deck Name"
          value={deckUpdate.name ? deckUpdate.name : ""}
          onChange={onChangeHandler}
        ></input>
        <label htmlFor="deckDes">Description</label>
        <textarea
          required
          id="deckDes"
          name="deckDes"
          placeholder="Brief description of the deck"
          value={deckUpdate.description ? deckUpdate.description : ""}
          onChange={onChangeHandler}
        ></textarea>
      </div>
      <button
        className={"bg-secondary text-white btn btn-outline-light"}
        type="button"
        onClick={() => history("/")}
      >
        Cancel
      </button>
      <button
        className={"bg-primary text-white btn btn-outline-light"}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default DeckForm;
