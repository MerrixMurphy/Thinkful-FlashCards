// The Study screen has the following features:

// You must use the readDeck() function from src/utils/api/index.js to load the deck that is being studied.
// There is a breadcrumb navigation bar with links to home /, followed by the name of the deck being studied and finally the text Study (e.g., Home/Rendering In React/Study).
// The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.
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
import React from "react";

function Study() {
  return <h1>Hi</h1>;
}

export default Study;
