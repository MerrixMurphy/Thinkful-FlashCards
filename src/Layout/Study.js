import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, listCards } from "../utils/api";

function Study({ currentDeck, setCurrentDeck, cards, setCards }) {
  const history = useHistory();
  const params = useParams();
  const [cardTracker, setCardTracker] = useState(0);
  const [sideTracker, setSideTracker] = useState("front");

  useEffect(() => {
    readDeck(params.deckId).then(setCurrentDeck);
    listCards(params.deckId).then(setCards);
  }, []);

  const sideSwitch = () => {
    sideTracker === "front" ? setSideTracker("back") : setSideTracker("front");
  };

  const nextCard = () => {
    if (cardTracker < cards.length - 1) {
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

  return (
    <div>
      <h2>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link> / Study
      </h2>
      <h1>Study: {currentDeck.name}</h1>
      {cards.length > 2 ? (
        <div>
          <h2>
            Cards: {cardTracker + 1} of {cards.length}
          </h2>
          {sideTracker === "front" ? (
            <div>
              <p>{cards[cardTracker].front}</p>
              <button onClick={sideSwitch}>Flip</button>
            </div>
          ) : (
            <div>
              <p>{cards[cardTracker].back}</p>
              <button onClick={sideSwitch}>Flip</button>
              <button onClick={nextCard}>Next</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Not enough cards.</h2>{" "}
          <p>
            You need at least 3 cards to study. There are {cards.length} in this
            deck.
          </p>
          <button
            onClick={() => history.push(`/decks/${currentDeck.id}/cards/new`)}
          >
            Add Cards
          </button>
        </div>
      )}
    </div>
  );
}

export default Study;
