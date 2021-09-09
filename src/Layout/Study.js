import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study({ currentDeck, setCurrentDeck }) {
  const history = useHistory();
  const params = useParams();
  const [cardTracker, setCardTracker] = useState(0);
  const [sideTracker, setSideTracker] = useState("front");

  useEffect(() => {
    readDeck(params.deckId).then(setCurrentDeck);
  }, []);

  const sideSwitch = () => {
    sideTracker === "front" ? setSideTracker("back") : setSideTracker("front");
  };

  const nextCard = () => {
    if (cardTracker < currentDeck.cards.length - 1) {
      setCardTracker(cardTracker + 1);
      setSideTracker("front");
    } else {
      if (
        window.confirm(
          "Restart cards? \n\n Click `cancel` to return to the home page."
        )
      ) {
        setSideTracker("front");
        setCardTracker(0);
      } else {
        history.push("/");
      }
    }
  };

  return currentDeck.cards ? (
    <div>
      <h5 className={"bg-light p-2"}>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link> / Study
      </h5>
      <h1>{currentDeck.name}: Study</h1>
      {currentDeck.cards.length > 2 ? (
        <div>
          <h2>{`Card ${cardTracker + 1} of ${currentDeck.cards.length}`}</h2>
          {sideTracker === "front" ? (
            <div>
              <p>{currentDeck.cards[cardTracker].front}</p>
              <button
                className={"bg-secondary text-white"}
                onClick={sideSwitch}
              >
                Flip
              </button>
            </div>
          ) : (
            <div>
              <p>{currentDeck.cards[cardTracker].back}</p>
              <button
                className={"bg-secondary text-white"}
                onClick={sideSwitch}
              >
                Flip
              </button>
              <button className={"bg-primary text-white"} onClick={nextCard}>
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Not enough cards.</h2>{" "}
          <p>
            You need at least 3 cards to study. There are{" "}
            {currentDeck.cards.length} in this deck.
          </p>
          <button
            className={"bg-primary text-white"}
            onClick={() => history.push(`/decks/${currentDeck.id}/cards/new`)}
          >
            Add Cards
          </button>
        </div>
      )}
    </div>
  ) : null;
}

export default Study;
