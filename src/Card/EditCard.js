// pre-fill with information for the existing card and update.

import React, { useEffect, useState } from "react";
import { readDeck, readCard } from "../utils/api";
import { Link, useHistory, useParams } from "react-router-dom";

function EditCard({ currentDeck, setCurrentDeck }) {
  const history = useHistory();
  const params = useParams();
  const [currentCard, setCurrentCard] = useState([]);

  useEffect(() => {
    readDeck(params.deckId).then(setCurrentDeck);
  }, []);

  useEffect(() => {
    readCard(params.cardId).then(setCurrentCard);
  }, []);

  return (
    <div>
      <h2>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link> / Edit
        Card {"1"}
      </h2>
      <h1>React Router: Add Card</h1>
      <form>
        <label for="cardFront">Front</label>
        <textarea
          required
          id="cardFront"
          name="cardFront"
          value={""}
          type="text"
        ></textarea>
        <label for="cardBack">Back</label>
        <textarea required id="cardBack" name="cardBack" value={""}></textarea>
        <button onClick={() => history.push("/")}>Cancel</button>
        <button onClick={() => history.push("/")}>Save</button>
      </form>
    </div>
  );
}

export default EditCard;
