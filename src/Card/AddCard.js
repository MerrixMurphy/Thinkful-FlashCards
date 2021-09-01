// add to website
// If the user clicks "Save", a new card is created and associated with the relevant deck. Then the form is cleared and the process for adding a card is restarted.
import React, { useEffect } from "react";
import { readDeck } from "../utils/api";
import { Link, useHistory } from "react-router-dom";

function AddCard({ currentDeck, setCurrentDeck }) {
  const history = useHistory();

  useEffect(() => {
    readDeck(1).then(setCurrentDeck);
  }, []);

  return (
    <>
      <h2>
        <Link to="/">Home</Link> / <Link>{currentDeck.name}</Link> / Add Card
      </h2>
      <h1>React Router: Add Card</h1>
      <form>
        <label for="cardFront">Front</label>
        <textarea
          id="cardFront"
          name="cardFront"
          placeholder="Front side of card"
          type="text"
        ></textarea>
        <label for="cardBack">Back</label>
        <textarea
          id="cardBack"
          name="cardBack"
          placeholder="Back side of card"
        ></textarea>
        <button onClick={() => history.push("/")}>Done</button>
        <button>Submit</button>
      </form>
    </>
  );
}

export default AddCard;
