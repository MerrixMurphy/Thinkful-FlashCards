import React, { useEffect } from "react";
import { readDeck, updateDeck } from "../utils/api";
import { Link, useHistory, useParams } from "react-router-dom";

function EditDeck({ currentDeck, setCurrentDeck }) {
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    setCurrentDeck([]);
    readDeck(params.deckId).then(setCurrentDeck);
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    const deckName = document.getElementById("deckName").value;
    const deckDes = document.getElementById("deckDes").value;
    const deckUpdate = {
      id: params.deckId,
      name: deckName,
      description: deckDes,
    };
    updateDeck(deckUpdate);
    history.push(`/decks/${params.deckId}`);
  };

  return (
    <div>
      <h2>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link> / Edit
        Deck
      </h2>
      <h1>Edit Deck</h1>
      <form onSubmit={submitHandler}>
        <label for="deckName">Name</label>
        <input
          required
          id="deckName"
          name="deckName"
          value={currentDeck.name}
          type="text"
        ></input>
        <label for="deckDes">Description</label>
        <textarea
          required
          id="deckDes"
          name="deckDes"
          value={currentDeck.description}
        ></textarea>
        <button onClick={() => history.push("/")}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditDeck;
