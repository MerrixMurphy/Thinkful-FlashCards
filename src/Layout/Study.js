import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study({ currentDeck, setCurrentDeck }) {
  const history = useNavigate();
  const params = useParams();

  // states to track which side for the study card and which number in the deck.
  const [cardTracker, setCardTracker] = useState(0);
  const [sideTracker, setSideTracker] = useState("front");

  // useEffect to set current deck.
  useEffect(() => {
    readDeck(params.deckId).then(setCurrentDeck);
  }, [params.deckId, setCurrentDeck]);

  // An on click handler to switch sides for the cards.
  const sideSwitch = () => {
    sideTracker === "front" ? setSideTracker("back") : setSideTracker("front");
  };

  // An on click handler to move to the next card.
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
        history("/");
      }
    }
  };

  return currentDeck.cards ? (
    // If there is cards in the Deck, render this.
    <div>
      <h5 className={"bg-light p-2"}>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link> / Study
      </h5>
      <h1>{currentDeck.name}: Study</h1>
      {currentDeck.cards.length > 2 ? (
        // If enough cards in the Deck, render this.
        <div>
          <h2>{`Card ${cardTracker + 1} of ${currentDeck.cards.length}`}</h2>
          {sideTracker === "front" ? (
            <div>
              <p>{currentDeck.cards[cardTracker].front}</p>
              <button
                className={"bg-secondary text-white btn btn-outline-light"}
                onClick={sideSwitch}
              >
                Flip
              </button>
            </div>
          ) : (
            <div>
              <p>{currentDeck.cards[cardTracker].back}</p>
              <button
                className={"bg-secondary text-white btn btn-outline-light"}
                onClick={sideSwitch}
              >
                Flip
              </button>
              <button
                className={"bg-primary text-white btn btn-outline-light"}
                onClick={nextCard}
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        //If not enough cards, render this.
        <div>
          <h2>Not enough cards.</h2>{" "}
          <p>
            You need at least 3 cards to study. There are{" "}
            {currentDeck.cards.length} in this deck.
          </p>
          <button
            className={"bg-primary text-white btn btn-outline-light"}
            onClick={() => history(`/decks/${currentDeck.id}/cards/new`)}
          >
            Add Cards
          </button>
        </div>
      )}
    </div>
  ) : null;
}

export default Study;
