// Cards are shown one at a time, front-side first.
// A button at the bottom of each card "flips" it to the other side.
// After flipping the card, the screen shows a next button (see the "Next button" section below) to continue to the next card.
// After the final card in the deck has been shown, a message (see the "Restart prompt" section below) is shown offering the user the opportunity to restart the deck.
// If the user does not restart the deck, they should return to the home screen.
// Studying a deck with two or fewer cards should display a "Not enough cards" message (see the "Not enough cards" section below) and a button to add cards to the deck.

// Next button
// The next button appears after the card is flipped.

// Restart prompt
// When all cards are finished, a message is shown and the user is offered the opportunity to restart the deck. If the user does not restart the deck, they return to the home screen.

// You can use window.confirm() to create the modal dialog shown in the screenshot below.

// Not enough cards
// Studying a Deck with two or fewer cards should display a "Not enough cards" message and a button to add cards to the deck.
// Clicking the "Add Cards" button should take the user to the Add Card screen.
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study({ currentDeck, setCurrentDeck }) {
  const history = useHistory();

  useEffect(() => {
    readDeck(currentDeck.id).then();
  });

  return (
    <div>
      <h2>
        <Link to="/">Home</Link> / <Link>{currentDeck.name}</Link> / Study
      </h2>
      <h1>Study: {currentDeck.name}</h1>
      {false ? (
        <div>
          <h2>
            Cards: {""} of {""}
          </h2>{" "}
          <p>{""}</p>
          <button>Flip</button>
        </div>
      ) : (
        <div>
          <h2>Not enough cards.</h2>{" "}
          <p>
            You need at least 3 cards to study. There are {"num"} in this deck.
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
