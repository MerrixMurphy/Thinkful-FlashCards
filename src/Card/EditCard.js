// pre-fill with information for the existing card and update.
//Update breadcrumb

import React, { useEffect } from "react";
import { readDeck, readCard } from "../utils/api";
import { Link, useHistory } from "react-router-dom";

function EditCard({ currentDeck, setCurrentDeck }) {
  const history = useHistory();

  useEffect(() => {
    readDeck(1).then(setCurrentDeck);
  }, []);

  useEffect(() => {
    readCard(1).then();
  }, []);

  return (
    <>
      <h2>
        <Link to="/">Home</Link> / <Link>{currentDeck.name}</Link> / Edit Card {"1"}
      </h2>
      <h1>React Router: Add Card</h1>
      <form>
        <label for="cardFront">Front</label>
        <textarea
          id="cardFront"
          name="cardFront"
          defaultValue={}
          type="text"
        ></textarea>
        <label for="cardBack">Back</label>
        <textarea
          id="cardBack"
          name="cardBack"
          defaultValue={}
        ></textarea>
        <button onClick={() => history.push("/")}>Cancel</button>
        <button onClick={() => history.push("/")}>Save</button>
      </form>
    </>
  );
}

export default EditCard;
