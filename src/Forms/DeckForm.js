import React, { useEffect, useState } from "react";
import { updateDeck, createDeck, readDeck } from "../utils/api";
import { useHistory } from "react-router-dom";

function DeckForm({ currentDeck, setCurrentDeck, setCurrentDeckAmount }) {
  const history = useHistory();
  const [deckUpdate] = useState({});

  const submitHandler = (event) => {
    event.preventDefault();

    if (currentDeck) {
      deckUpdate.id = currentDeck.id;
    }

    currentDeck
      ? updateDeck(deckUpdate)
      : createDeck(deckUpdate).then((response) =>
          setCurrentDeckAmount(response.id)
        );

    if (currentDeck) {
      readDeck(currentDeck.id)
        .then(setCurrentDeck)
        .then(() => history.push(`/decks/${currentDeck.id}`));
    }
  };

  const onChangeHandler = () => {
    const deckName = document.getElementById("deckName").value;
    const deckDes = document.getElementById("deckDes").value;
    deckUpdate.name = deckName;
    deckUpdate.description = deckDes;
  };

  useEffect(() => {
    const deckName = document.getElementById("deckName");
    const deckDes = document.getElementById("deckDes");

    if (currentDeck) {
      deckName.value = currentDeck.name;
      deckDes.value = currentDeck.description;
    }
  });

  return (
    <form onSubmit={submitHandler}>
      <label for="deckName">Name</label>
      <input
        required
        id="deckName"
        name="deckName"
        type="text"
        placeholder="Deck Name"
        onChange={onChangeHandler}
      ></input>
      <label for="deckDes">Description</label>
      <textarea
        required
        id="deckDes"
        name="deckDes"
        placeholder="Brief description of the deck"
        onChange={onChangeHandler}
      ></textarea>
      <button onClick={() => history.push("/")}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default DeckForm;
